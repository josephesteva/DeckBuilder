import { useEffect } from "react";
const ExploreContent = () => {
  const handleScroll = () => {
    const scrollThreshold = 1000; // Adjust this value based on scroll needs
    const stickyImage = document.querySelector(".explore-sticky");
    const thoughtBubble = document.querySelector(".thought-bubble");

    const secondScrollThreshold = 4000;
    const background = document.querySelector(".explore-background");
    const originalBackgroundStyle = "linear-gradient(to right, #c3dbfa 0%, #c3dbfa 50%, #035096 50%, yellow 100%)";
    const WatchSection = document.querySelector(".watch-live-battle-section");

    if (window.scrollY > scrollThreshold) {
      // Change the image source or apply a new background once scroll threshold is reached
      stickyImage.src = "/images/Ash-Ketchum.png";
      thoughtBubble.innerHTML = `
            <h2 style="font-family: 'pokemon solid'">Use Resources!</h2>
            <p>Gotta catch 'em all!</p>
            <p>You are on the road to becoming a Pokemon Master!</p>
            `;
    } else {
      // Reset the image source or revert to the original background
      stickyImage.src = "/images/Pikachu-Transparent-Background.png";
      thoughtBubble.innerHTML = `
            <h2 style="font-family: 'pokemon solid'">Hey Trainers!!</h2>
            <p>Be sure to explore trainer decks</p>
            <p>Leave a like & Follow your Favorites</p>
            `;
    }
    if (window.scrollY > secondScrollThreshold) {
      // Change the background color once the second scroll threshold is reached
      background.style.background = "black";
      WatchSection.classList.add("puff-in-hor");
    } else {
      background.style.background = originalBackgroundStyle;
      WatchSection.classList.remove("puff-in-hor");
    }
  };

  //Added UseEffect to scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the scroll listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="sticky-image">
        <div className="thought-bubble">
          <h2 style={{ fontFamily: "pokemon solid" }}>Hey Trainers!!</h2>
          <p>Be sure to explore trainer decks</p>
          <p>Leave a like & Follow your Favorites</p>
          {/* <p>Stay tuned for exciting updates events, and battles!</p> */}
        </div>
        <img
          src="/images/Pikachu-Transparent-Background.png"
          alt="Sticky Image"
          className="explore-sticky"
          loading="lazy"
        ></img>
      </div>

      <div className="more-info">
        <div className="prepare">
          <img src="/images/prepare-go.jpg" className="prepare-img" loading="lazy"></img>
          <h2>Prepare for Pokemon League</h2>
          <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 400 }}>
            Welcome, Trainer! Get ready to embark on an epic journey to conquer the Pokémon League. Sharpen your skills,
            fine-tune your strategy, and assemble the ultimate deck to face formidable opponents. Explore our vast
            collection of cards, build powerful decks, and strategize your way to victory. The Pokémon League awaits
            your challenge – are you prepared to become the Champion?
          </p>
        </div>
        <div className="prepare-unite">
          <img src="/images/pokemon-unite-169.png" className="prepare-img" loading="lazy"></img>
          <h2>Get Ready for the 2024 Pokemon UNITE Champoinship Series</h2>
          <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 400 }}>
            Pokémon UNITE players around the world can compete to earn an invitation to the 2024 World Championships in
            Honolulu, Hawai’i! This third year of Pokémon UNITE competition promises to be action-packed, highlighting
            players and teams from all around the globe.
          </p>
        </div>
      </div>

      <div className="cloud-image" style={{ backgroundImage: 'url("/images/cloudsheader.png")' }}></div>
      <div className="cloud-image2" style={{ backgroundImage: 'url("/images/cloudsheader.png")' }}></div>
    </>
  );
};

export default ExploreContent;
