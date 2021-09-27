import {useState, useEffect} from 'react';
import {Link, useRouterMatch} from 'react-router-dom';
import {fetchQueryMovies} from '../../Api/Api';
import SearchMovies from '../../components/SearchMovies/SearchMovies';

export default function FoundMoviesView({query}) {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('idle');
  // const [query, setQuery] = useState('');

  // const handlerQueryUpdate = newQuery => {
  //   if (query !== newQuery) {
  //     setQuery(newQuery);
  //     setStatus('pending');
  //   }
  // };

  useEffect(() => {
    try {
      if (query) {
        (async () => {
          setMovies(await fetchQueryMovies(query));
        })();
      }
    } catch {
      setStatus('rejected');
      setTimeout(() => setStatus('idle'), 5000);
    }
  }, [query]);

  useEffect(() => {
    movies !== [] || null || undefined
      ? setStatus('resolved')
      : setStatus('rejected');
  }, [movies]);

  return (
    <>
      {/* <SearchMovies onQueryUpdate={handlerQueryUpdate}></SearchMovies> */}

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
