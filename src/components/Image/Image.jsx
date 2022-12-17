import React, { useState } from 'react';
import fallbackImg from '../../../public/img404.png'

const Image = ({ src, classprop }) => {
  const [error, setError] = useState(false);

  return (
    <>
      <div hidden={!error}>
        <img src={fallbackImg} class={classprop} style={{
          height: '210px',
          objectFit: 'cover'
        }}></img>
      </div>
      <div hidden={error}>
        <img
          src={src}
          class={classprop}
          onError={() => setError(true)}
          style={{
            height: '210px',
            objectFit: 'cover'
          }}>
        </img>
      </div>
    </>
  )
}

export default Image;