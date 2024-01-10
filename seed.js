const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const NUM_CARDS = 2;

async function main() {

    //users
    const user1 = await prisma.user.create({
        data: {
            username: "User1",
            email: "user1@gmail.com",
            password: "123",
            isAdmin: false,
        },
    })

    const user2 = await prisma.user.create({
        data: {
            username: "User2",
            email: "user2@gmail.com",
            password: "123",
            isAdmin: false,
        },
    })

    //decks
    const deck1 = await prisma.deck.create({
        data: {
            name: "Deck1",
            userId: user1.id,
            description: "user 1 deck",
            numCards: 2,
        },
    })

    const deck2 = await prisma.deck.create({
        data: {
            name: "Deck2",
            userId: user2.id,
            description: "user 2 deck",
            numCards: 2,
        },
    })

    // comments
    await prisma.comment.create({
        data: {
            content: "comment test 1",
            userId: user1.id,
            deckId: deck1.id,
        },
    })

    await prisma.comment.create({
        data: {
            content: "comment test 2",
            userId: user2.id,
            deckId: deck1.id,
        },
    })

    await prisma.comment.create({
        data: {
            content: "comment test 3",
            userId: user1.id,
            deckId: deck2.id,
        },
    })

    await prisma.comment.create({
        data: {
            content: "comment test 4",
            userId: user2.id,
            deckId: deck2.id,
        },
    })

    // make cards and add to deck
    for (let i = 1; i <= NUM_CARDS; i++) {
        await prisma.card.create({
            data: {
                name: `Card${i}Deck1`,
                cardImage: `test.com`,
                deckId: deck1.id, //add to deck
            },
        })

        await prisma.card.create({
            data: {
                name: `Card${i}Deck2`,
                cardImage: `test.com`,
                deckId: deck2.id, //add to deck
            },
        })
    }

    //make users follow each other
    await prisma.user.update({
        where: { id: user1.id },
        data: { following: { connect: { id: user2.id } } },
    })

    await prisma.user.update({
        where: { id: user2.id },
        data: { following: { connect: { id: user1.id } } },
    })
}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
