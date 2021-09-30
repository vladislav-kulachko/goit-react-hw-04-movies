import {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {fetchQueryMovies} from '../../Api/Api';
import Loader from '../../components/Loader/Loader';
import {toast, Flip} from 'react-toastify';

export default function FoundMoviesViews() {
  const [movies, setMovies] = useState(null);
  const [status, setStatus] = useState('idle');
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (query) {
      setStatus('pending');
      (async () => {
        try {
          const fetch = await fetchQueryMovies(query);
          setMovies(fetch);
          if (fetch.length === 0) {
            setStatus('rejected');
            setTimeout(() => setStatus('idle'), 5000);
          } else setStatus('resolved');
        } catch {
          setStatus('rejected');
        }
      })();
    }
  }, [query]);

  useEffect(() => {
    if (status === 'rejected') {
      toast.error(`No movies found for ${query}`, {
        theme: 'colored',
        position: 'bottom-center',
        autoClose: 5000,
        transition: Flip,
        toastId: 2,
      });
    }
  }, [query, status]);

  return (
    <section>
      {status === 'pending' && <Loader></Loader>}
      <ul>
        {status === 'resolved' &&
          movies.map(({title, id}) => (
            <li key={id}>
              <Link
                to={{
                  pathname: `/movies/${id}`,
                  state: {prevPage: location, label: 'Back to found movies'},
                }}
              >
                {title}
              </Link>
            </li>
          ))}
        {status === 'rejected' && (
          <li>Not found movies for this request, try yet :( </li>
        )}
      </ul>
    </section>
  );
}
