import { useQuery } from 'react-query'

import type { IMDBResponse } from '../types/imbd'

// ! Normally key are set in .env, I only left it in URL for testing simplicity sake
const API_KEY = 'k_kf1m890e'

export function useSearch(searchParam: string) {
  const url =
    'https://imdb-api.com/API/AdvancedSearch/' +
    API_KEY +
    '?title=' +
    searchParam +
    '&title_type=feature,tv_movie,tv_series&sort=moviemeter,asc'

  return useQuery<IMDBResponse>(
    ['search', searchParam],
    () => fetch(url).then((res) => res.json()),
    {
      cacheTime: 0,
      staleTime: 0,
      enabled: searchParam.length > 1,
    },
  )
}
