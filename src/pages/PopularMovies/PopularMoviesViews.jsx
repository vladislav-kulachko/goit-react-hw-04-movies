import {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {fetchTrendMovies} from '../../Api/Api';
import Loader from '../../components/Loader/Loader';
import s from './PopularMoviesViews.module.scss';

export default function PopularMoviesViews() {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState();
  const location = useLocation();
  useEffect(() => {
    setStatus('pending');
    (async () => {
      try {
        const fetch = await fetchTrendMovies();
        setMovies(fetch);
        fetch.length === 0 ? setStatus('rejected') : setStatus('resolved');
      } catch (e) {
        setStatus('rejected');
        setErrorMessage(`Request failed with status code 404. Page not found.`);
      }
    })();
  }, []);

  return (
    <section className={s.container}>
      {status === 'pending' && <Loader></Loader>}
      {status === 'resolved' && (
        <>
          <h1 className={s.title}>Trending today</h1>
          <ol className={s.list}>
            {movies.map(({title, id}) => (
              <li key={id} className={s.item}>
                <Link
                  to={{
                    pathname: `/movies/${id}`,
                    state: {
                      prevPage: location,
                      label: 'Back to popular movies',
                    },
                  }}
                >
                  {title}
                </Link>
              </li>
            ))}
          </ol>
        </>
      )}
      {status === 'rejected' && <h2>{errorMessage}</h2>}
    </section>
  );
}
