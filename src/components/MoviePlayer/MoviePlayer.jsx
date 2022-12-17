import React, { useState } from 'react';
import Youtube from 'react-youtube';
import styles from './MoviePlayer.module.css'
import { Spinner } from 'react-bootstrap';

const MoviePlayer = ({ videoId }) => {
  const [ready, setReady] = useState(false)
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className={styles['video-container']} aria-active={ready}>
      <div className={styles['spinner']} hidden={ready}>
        <Spinner animation="border" variant="primary" />
      </div>
      <div hidden={!ready}>
        <Youtube videoId={videoId} opts={opts} onReady={() => setReady(true)} />
      </div>
    </div>
  );
}

export default MoviePlayer;