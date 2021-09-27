import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {fetchTrendMovies} from '../../Api/Api';
export default function PopularMoviesView() {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    setStatus('pending');
    try {
      (async () => {
        setMovies(await fetchTrendMovies());
      })();
    } catch {
      setStatus('rejected');
      setTimeout(() => setStatus('idle'), 5000);
    }
  }, []);

  useEffect(() => {
    movies !== [] || null || undefined
      ? setStatus('resolved')
      : setStatus('rejected');
  }, [movies]);

  return (
    <>
      <h1>Trending today</h1>
      <ul>
        {status === 'resolved' &&
          movies.map(({title, id}) => (
            <li key={id}>
              <Link to={`movies/${id}`}>{title}</Link>
            </li>
          ))}
      </ul>
    </>
  );
}
