import { useNavigate, useParams } from "react-router-dom";
import { useMovieDetail, useSearchVideos } from "./MovieDetailPage.hooks";
import styles from './MovieDetailPage.module.css'
import MoviePlayer from "../../components/MoviePlayer/MoviePlayer";
import { Carousel } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { useSearchStore } from "../../stores/MovieStores";
import fallbackImg from '../../../public/img404.png'

const baseImagePath = 'https://image.tmdb.org/t/p/w500';
const originalBaseImagePath = 'https://image.tmdb.org/t/p/original';

const MovieDetailPage = () => {
  const { id } = useParams();
  const { isLoading, isError, data } = useMovieDetail(id)
  const { data: videos } = useSearchVideos(id)
  const search = useSearchStore(state => state.search);
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const [index, setIndex] = useState(0);

  if (search?.length && !mounted) {
    navigate('/')
    return <></>
  }

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  if (isLoading || isError) {
    return (
      <div className={styles['loading']}>
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className={styles['container']} style={{
        backgroundImage: data.backdrop_path ? `url('${originalBaseImagePath}/${data.backdrop_path}')` : "url('https://www.macmillandictionary.com/us/external/slideshow/full/Grey_full.png')",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundColor: 'rgba(33, 37, 41, 0.82)',
        backgroundBlendMode: 'multiply'
      }}>
        <div className={styles['image-container']}>
          {
            error && <img
              src={fallbackImg}
              class="card-img rounded"
              className={styles['placeholder']}
            ></img>
          }
          <div hidden={error}>
            <img
              src={`${baseImagePath}${data.poster_path}`}
              class="card-img rounded"
              className={styles['image']}
              onError={() => setError(true)}
            ></img>
          </div>
        </div>
        <div className={styles['content']}>
          <div className={styles['details']}>
            <div>
              <h1 >{data.original_title}</h1>
              <p>{data.overview}</p>
            </div>

            <div className={styles['text-group']}>
              <div className={styles['text-group-key']}>
                <h5>Release Date</h5>
                <h5>Runtime</h5>
                <h5>Rating</h5>
              </div>
              <div className={styles['text-group-value']}>
                <h5>: {data.release_date}</h5>
                <h5>: {data.runtime}</h5>
                <h5>: {data.vote_average}</h5>
              </div>
            </div>
          </div>

          <div className={styles['content-footer']}>
            <div className={styles['detail-container']}>
              <h4>Spoken Language</h4>
              <div className={styles['btn-group']}>
                {data.spoken_languages.map((lang, i) => {
                  if (lang.name == '') return
                  return (
                    <button type="button" class="btn btn-primary" key={i}>{lang.name}</button>
                  )
                })}
              </div>
            </div>
            <div className={styles['detail-container']}>
              <h4>Genre</h4>
              <div className={styles['btn-group']}>
                {data.genres.map((genre, i) => <button type="button" class="btn btn-primary" key={i}>{genre.name}</button>)}
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        videos?.length
          ? <>
            <Carousel activeIndex={index} onSelect={handleSelect} interval={10000000}>
              {
                videos?.map(video => (
                  <Carousel.Item>
                    <MoviePlayer videoId={video.key} />
                  </Carousel.Item>
                ))
              }
            </Carousel>
          </> : <Carousel activeIndex={index} onSelect={handleSelect} interval={10000000}>
            <Carousel.Item>
              <div style={{
                height: '200px',
                width: '100%',
              }}></div>
              <Carousel.Caption>
                <h3>No video available</h3>
                <p>
                  This is is usually from old movie
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
      }
    </div >
  )
}

export default MovieDetailPage;