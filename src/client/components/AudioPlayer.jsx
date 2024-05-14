import React, { useState, useRef } from "react";
import { MdMusicNote } from "react-icons/md";
import { MdMusicOff } from "react-icons/md";
import PokemonThemeGuitar from "/music/PokémonThemeGuitar.mp3";
import "../styles/AudioPlayer.css";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <span>
      <audio ref={audioRef} src="/music/PokémonThemeGuitar.mp3" loop />
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
