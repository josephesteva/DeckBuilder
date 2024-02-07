import React, { useState } from 'react';
import { MdMusicNote } from "react-icons/md";
import { MdMusicOff } from "react-icons/md";


const AudioPlayer = () => {

  const [isPaused, setIsPaused] = useState(false);


  const handlePause = () => {
    setIsPaused(!isPaused);
  };




  return (

    <div>
      {!isPaused ? null : (
      <iframe
        width="0"
        height="0"
        src="https://www.youtube.com/embed/zxKeIAZT7Mw?si=00nqQLgYVcREUtox&amp;disablekb=1&amp;controls=1&amp;autoplay=1&amp;mute=0"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;">
      </iframe>
      )}

<button className='audio-container' onClick={handlePause}>{isPaused ? <MdMusicOff className='audio-player' /> :  <MdMusicNote className='audio-player' /> }</button>
    </div>
  )
}

export default AudioPlayer;