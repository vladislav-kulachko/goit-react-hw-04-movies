import {useState, useEffect} from 'react';
import {Link, useRouterMatch} from 'react-router-dom';
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
      setStatus('resolved');
    } catch {
      setStatus('rejected');
      setTimeout(() => setStatus('idle'), 5000);
    }
  }, []);
  return (
    <ul>
      {status === 'resolved' &&
        movies.map(({title, id}) => (
          <li key={id}>
            <Link to={`/movies/${id}`}>{title}</Link>
          </li>
        ))}
    </ul>
  );
}
