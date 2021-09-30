import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'b74c0dc966c6718b20701d7c34776374';

export async function fetchTrendMovies() {
  const {data} = await axios.get(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`,
  );
  return data.results;
}
export async function fetchQueryMovies(query) {
  const {data} = await axios.get(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`,
  );
  return data.results;
}
export async function fetchMovieDetails(movieId) {
  const {data} = await axios.get(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`,
  );
  return data;
}
export async function fetchMovieCredits(movieId) {
  const {data} = await axios.get(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`,
  );
  return data.cast;
}
export async function fetchMovieReviews(movieId) {
  const {data} = await axios.get(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`,
  );
  return data.results;
}
