import { useQuery } from 'react-query';
import movieRepository from '../../repository/MovieRepository';
import HomePageConstants from './HomePageConstants';
import { sortBy } from 'lodash';

export const useSearchMovies = (searchText, sort) => {
  return useQuery({
    queryKey: ['movies', searchText, sort],
    refetchOnMount: false,
    cacheTime: 0,
    enabled: true,
    select: (data) => {
      if (sort == HomePageConstants.sort.titleAsc) return sortBy(data, (d) => d.original_title)
      if (sort == HomePageConstants.sort.titleDesc) return sortBy(data, (d) => d.original_title).reverse()
      return data
    },
    queryFn: () => {
      if (searchText) {
        return movieRepository.search(searchText)
      }

      return movieRepository.getPopular()
    }
  });
}