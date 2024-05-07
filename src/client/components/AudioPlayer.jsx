import React, { useState } from "react";
import { MdMusicNote } from "react-icons/md";
import { MdMusicOff } from "react-icons/md";
import PokemonThemeGuitar from "/music/PokémonThemeGuitar.mp3";
import "../styles/AudioPlayer.css";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(new Audio(PokemonThemeGuitar));

  // useEffect(() => {
  //   setAudio((audio.loop = true));
  // }, []);

  console.log(audio);

  const toggleAudio = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <span>
      <button className="audio-container" onClick={toggleAudio}>
        {isPlaying ? (
          <div>
            <MdMusicNote className="audio-player" />
            Pause
          </div>
        ) : (
          <div>
            <MdMusicOff className="audio-player" />
            Play
          </div>
        )}
      </button>
    </span>
  );
};

export default AudioPlayer;
