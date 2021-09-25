import {useState, useEffect} from 'react';
import {Link, useRouterMatch} from 'react-router-dom';
import {fetchQueryMovies} from '../../Api/Api';
import SearchMovies from '../../components/SearchMovies/SearchMovies';

export default function FoundMoviesView() {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('idle');
  const [query, setQuery] = useState('');

  const handlerQueryUpdate = newQuery => {
    if (query !== newQuery) {
      setQuery(newQuery);
      setStatus('pending');
    }
  };

  useEffect(() => {
    try {
      if (query !== '' || null) {
        (async () => {
          setMovies(await fetchQueryMovies(query));
        })();
      }
      setStatus('resolved');
    } catch {
      setStatus('rejected');
      setTimeout(() => setStatus('idle'), 5000);
    }
  }, [query]);
  return (
    <>
      <SearchMovies onQueryUpdate={handlerQueryUpdate}></SearchMovies>
      <ul>
        {status === 'resolved' &&
          movies.map(({title, id}) => (
            <li key={id}>
              <Link to={`/movies/${id}`}>{title}</Link>
            </li>
          ))}
      </ul>
    </>
  );
}
