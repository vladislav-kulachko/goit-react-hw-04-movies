import {fetchMovieDetails} from '../../Api/Api';
import {useEffect, useState} from 'react';
import {useParams, NavLink} from 'react-router-dom';
export default function DetailsMovieView() {
  const [movie, setMovie] = useState(null);
  const [status, setStatus] = useState('idle');
  const {movieId} = useParams();

  useEffect(() => {
    movie !== [] || null || undefined
      ? setStatus('resolved')
      : setStatus('rejected');
  }, [movie]);

  useEffect(() => {
    try {
      if (movieId) {
        setStatus('pending');
        (async () => setMovie(await fetchMovieDetails(movieId)))();
      }
    } catch {
      setStatus('rejected');
    }
  }, [movieId]);

  return (
    status === 'resolved' && (
      <>
        <button type="button">GoBack</button>
        <article>
          <h1>{movie.title}</h1>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h2>Genres</h2>
          <ul>
            {movie.genres.map(({name, id}) => (
              <li key={id}>{name}</li>
            ))}
          </ul>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
            alt={movie.title}
          />
        </article>
        <NavLink to="cast">Cast</NavLink>
        <NavLink to="review">Review</NavLink>
      </>
    )
  );
}
