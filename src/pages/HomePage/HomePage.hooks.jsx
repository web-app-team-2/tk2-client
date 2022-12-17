import { useQuery } from 'react-query';
import movieRepository from '../../repository/MovieRepository';
import HomePageConstants from './HomePageConstants';

export const useSearchMovies = (searchText, sort) => {
  return useQuery({
    queryKey: ['movies', searchText, sort],
    refetchOnMount: false,
    cacheTime: 0,
    enabled: true,
    select: (data) => {
      if (sort == HomePageConstants.sort.titleAsc) return data.sort()
      if (sort == HomePageConstants.sort.titleDesc) return data.sort().reverse()
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