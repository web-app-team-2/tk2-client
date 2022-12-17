import { useQuery } from 'react-query';
import movieRepository from '../../repository/MovieRepository';

export const useMovieDetail = (id) => {
  return useQuery({
    queryKey: ['movie', id],
    refetchOnMount: false,
    cacheTime: 0,
    enabled: true,
    queryFn: () => movieRepository.getDetailById(id)
  });
}

export const useSearchVideos = (id) => {
  return useQuery({
    queryKey: ['videos', id],
    refetchOnMount: false,
    cacheTime: 0,
    enabled: true,
    queryFn: () => movieRepository.getVideosByID(id)
  });
}