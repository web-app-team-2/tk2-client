import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MovieItem.module.css'
import dayjs from 'dayjs'
import Image from '../Image/Image';

const baseImagePath = 'https://image.tmdb.org/t/p/w200';

const MovieItem = ({ movie }) => {
  const navigate = useNavigate()

  return (
    <div className={styles['container']} onClick={() => navigate(`/movie/${movie.id}`)}>
      <Image src={`${baseImagePath}${movie.poster_path}`} classprop="card-img rounded" />
      {/* <img src={`${baseImagePath}${movie.poster_path}`} class="card-img rounded" onError={() => console.log('error!')}></img> */}
      <div className={styles['description']}>
        <p style={{ margin: 0 }}><strong>{movie.original_title}</strong></p>
        <p style={{ margin: 0, marginTop: '5px' }}>{dayjs(movie.release_date).format('YYYY')}</p>
      </div>
    </div>
  )
}

export default MovieItem;