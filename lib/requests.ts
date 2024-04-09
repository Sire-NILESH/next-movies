import { MediaType } from "@prisma/client";

const API_KEY = process.env.NEXT_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const tvRequests = {
  fetchTrending: `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=en-US`,
  fetchDiscoverMedias: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchSciFiShows: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=10765`,
  fetchComedyShows: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=35`,
  fetchMysteryShows: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=9648`,
  fetchRomanceShows: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=10749`,
  fetchDocumentaries: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=99`,
};
export const allRequests = {
  fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchDiscoverMedias: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
  fetchComedyMovies: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=35`,
  fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
  fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
  fetchDocumentaries: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=99`,
};
export const movieRequests = {
  fetchTrending: `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`,
  fetchDiscoverMedias: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
  fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
  fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
  fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
  fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`,
};

export const mediaDetailRequest = (mediaId: number, mediaType: MediaType) =>
  `https://api.themoviedb.org/3/${mediaType}/${mediaId}?api_key=${process.env.NEXT_API_KEY}&language=en-US&append_to_response=videos`;
