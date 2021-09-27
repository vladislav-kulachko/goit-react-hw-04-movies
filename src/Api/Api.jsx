const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'b74c0dc966c6718b20701d7c34776374';
export async function fetchTrendMovies() {
  const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
  const {results} = await res.json();
  const movies = results;
  return movies;
}
export async function fetchQueryMovies(query) {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`,
  );
  const {results} = await res.json();
  const movies = results;
  return movies;
}
export async function fetchMovieDetails(movieId) {
  const res = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  const movie = await res.json();
  return movie;
}
export async function fetchMovieCredits() {}
export async function fetchMovieRevies() {}
