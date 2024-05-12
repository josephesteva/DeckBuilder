const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const pokemon = require('pokemontcgsdk');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

pokemon.configure({ apiKey: process.env.API_KEY })
const NUM_USERS = 10; //Number of users to seed
const NUM_BASES = 6; //Number of base pokemon sets
const MAX_CARDS = 60; //Max cards in a deck
const SALT_ROUNDS = 5;

async function main() {

    //create users
    let users = [];
    for (let i = 0; i < NUM_USERS; i++) {

        const hashedPassword = await bcrypt.hash('123', SALT_ROUNDS);
        const user = await prisma.user.create({
            data: {
                username: faker.internet.userName(),
                email: faker.internet.email(),
                password: hashedPassword,
                isAdmin: false,
            },
        });
        users.push(user);
        console.log(`User ${i + 1}: ${user.username}`);
    }
    console.log("users seeded successfully!");


    // create admin
    const hashedPassword = await bcrypt.hash('123', SALT_ROUNDS);

    const admin = await prisma.user.create({
        data: {
            username: "Admin",
            email: "admin@gmail.com",
            password: hashedPassword,
            isAdmin: true,
        },
    })
    console.log("admin seeded sucessfully! " + admin.username);

    //decks
    let decks = [];
    for (let i = 0; i < NUM_USERS; i++) {
        const deck = await prisma.deck.create({
            data: {
                name: "Deck" + (i+1),
                userId: users[i].id,
                description: "user " + (i+1) + " deck",
                numCards: 60,
            },
        })
        decks.push(deck);
    }

    console.log("decks seeded sucessfully!");


    // each user comments on each deck
    for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < decks.length; j++) {
                await prisma.comment.create({
                    data: {
                        content: faker.lorem.sentence(),
                        userId: users[i].id,
                        deckId: decks[j].id,
                    },
                });
        }
    }
    console.log("comments seeded sucessfully!");


    //Create cards (Gets them from poke api)
    let allCards = [];

    let promises = [];
    for (let i = 1; i <= NUM_BASES; i++) {
        let promise = pokemon.card.all({ q: 'set.id:base' + i })
            .then(async result => {
                for (let i = 0; i < result.length; i++) {
                    const newCard = await prisma.card.create({
                        data: {
                            name: result[i].name,
                            cardImage: result[i].images.small,
                            mainType: result[i].types && result[i].types.length > 0 ? result[i].types[0] : "noType",
                            secondaryType: result[i].types && result[i].types.length > 1 ? result[i].types[1] : "noType",
                            setName: result[i].set.name,
                            hp: +result[i].hp,
                            superType: result[i].supertype,
                        },
                    });

                    allCards.push(newCard);
                }
                console.log("loaded", result[1].set.name);

            });
        promises.push(promise);
    }

    // Wait for all promises to resolve
    await Promise.all(promises);

    console.log("all base pokemon cards seeded sucessfully!");


    // Function to shuffle cards
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Function to shuffle all cards and create a deck
    async function createDeck(deck, allCards) {
        let shuffledCards = shuffle([...allCards]);

        let numCards = 0;

        if (shuffledCards.length >= MAX_CARDS) {
            numCards = MAX_CARDS;
        }
        else {
            numCards = shuffledCards.length;
        }
        for (let i = 0; i < numCards; i++) {
            await prisma.cardsOnDecks.create({
                data: {
                    deckId: deck.id,
                    cardId: shuffledCards[i].id,
                },
            });
        }
    }

    // Create decks
    for (let i = 0; i < decks.length; i++) {
        createDeck(decks[i], allCards)
    }

    console.log("decks seeded sucessfully!");


    // Every user follows each other
    for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < users.length; j++) {
            // check that user doesnt follow themself
            if (i !== j) {
                await prisma.user.update({
                    where: { id: users[i].id },
                    data: { following: { connect: { id: users[j].id } } },
                });
            }
        }
    }
    console.log("following seeded sucessfully!");
    console.log("Seeding was a success!")
}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
