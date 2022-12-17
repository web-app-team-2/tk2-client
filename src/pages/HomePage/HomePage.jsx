import React, { useState } from 'react';
import MovieItem from '../../components/MovieItem/MovieItem';
import { useSearchStore } from '../../stores/MovieStores';
import { useSearchMovies } from './HomePage.hooks';
import styles from './HomePage.module.css'
import { DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';
import HomePageConstants from './HomePageConstants';

const HomePage = () => {
  const [sort, setSort] = useState(null)
  const search = useSearchStore(state => state.search);
  const { data, isLoading, isError } = useSearchMovies(search, sort)

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
    <div className={styles['container']}>
      <div className={styles['wrapper-header']}>
        <DropdownButton
          as={ButtonGroup}
          key={'Primary'}
          id={`dropdown-variants-Primary`}
          variant={'primary'.toLowerCase()}
          title={`Filter ${sort ? sort : ''}`}
        >
          {
            Object.keys(HomePageConstants.sort).map((v, i) => {
              return (
                <div onClick={() => setSort(HomePageConstants.sort[v])} key={i}>
                  <Dropdown.Item eventKey="1">{HomePageConstants.sort[v]}</Dropdown.Item>
                </div>
              )
            })
          }
        </DropdownButton>
      </div>
      <div className={styles['wrapper']}>
        {
          data.map((movie, i) => {
            return <div className={styles['box']} key={i}>
              <MovieItem movie={movie} />
            </div>
          })
        }
      </div>
    </div>
  )
}

export default HomePage;