
const ExploreContent = () => {
    return (
        
        <>
        <div className="sticky-image">
                <div className='thought-bubble'>
                    <h2 style={{ fontFamily: 'pokemon solid'}}>Hey Guys!!</h2>
                    <p>Be sure to signup for upcoming</p>
                    <p>Pokemon battle events</p>
                    <p>in your area!</p>
                </div>
                <img src="/images/Pikachu-Transparent-Background.png" alt="Sticky Image" className='explore-sticky'></img>
            </div>

        
        <div className='more-info'>
            <div className='prepare'>
            <img src='/images/prepare-go.jpg' className='prepare-img'></img>
            <h2>Prepare for Pokemon League</h2>
            <p style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400 }}>Welcome, Trainer! Get ready to embark on an epic journey to conquer the Pokémon League. Sharpen your skills, fine-tune your strategy, and assemble the ultimate deck to face formidable opponents. Explore our vast collection of cards, build powerful decks, and strategize your way to victory. The Pokémon League awaits your challenge – are you prepared to become the Champion?</p>

            </div> 
                <div className='prepare-unite'>
                    <img src='/images/pokemon-unite-169.png' className='prepare-img'></img>
                    <h2>Get Ready for the 2024 Pokemon UNITE Champoinship Series</h2>
                    <p style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400 }}>Pokémon UNITE players around the world can compete to earn an invitation to the 2024 World Championships in Honolulu, Hawai’i! This third year of Pokémon UNITE competition promises to be action-packed, highlighting players and teams from all around the globe.</p>

            </div>
        </div>  

        <div className="cloud-image" style={{ backgroundImage: 'url("/images/cloudsheader.png")' }}></div>
        <div className="cloud-image2" style={{ backgroundImage: 'url("/images/cloudsheader.png")' }}></div>
        </>   
    )
}


export default ExploreContent;