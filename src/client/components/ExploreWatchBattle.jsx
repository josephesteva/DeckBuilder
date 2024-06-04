import React, { useEffect, useState, useRef } from "react";

const WatchBattle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Stop observing once the section is visible to avoid unnecessary checks
            observer.unobserve(sectionRef.current);
          }
        });
      },
      { threshold: 1 } // Adjust the threshold / Doesn't impact need .
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Clean up the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={sectionRef} className={`watch-live-battle-section ${isVisible ? "visible" : ""}`}>
      {isVisible && (
        <>
          <div className="prepare">
            <h2>Coming Soon</h2>
            <p>Exciting News!</p>
            <p>
              Discover a new feature that allows you to seamlessly convert your custom Pokémon deck into an importable
              format. This groundbreaking functionality enables you to share your strategic decks with friends or
              quickly load them for battle.
            </p>
            <p>
              Stay tuned for a step-by-step guide on how to utilize this feature and take your Pokémon battles to the
              next level!
            </p>
          </div>
          <iframe
            title="Live Pokemon Battle"
            width="1400"
            height="400"
            src="https://replay.pokemonshowdown.com/oumonotype-82345404"
            frameBorder="0"
          ></iframe>

          <img src="/images/Mewtwo.png" alt="MewTwo" className="mewtwo"></img>
        </>
      )}
    </div>
  );
};

export default WatchBattle;
