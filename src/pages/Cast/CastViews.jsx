import {fetchMovieCredits} from '../../Api/Api';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

export default function CastViews() {
  const [status, setStatus] = useState('idle');
  const {movieId} = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    if (movieId) {
      setStatus('pending');
      (async () => {
        try {
          const fetch = await fetchMovieCredits(movieId);
          setCast(fetch);
          fetch.length === 0 ? setStatus('rejected') : setStatus('resolved');
        } catch (e) {
          setStatus('rejected');
        }
      })();
    }
  }, [movieId]);

  return (
    <section>
      {status === 'pending' && <Loader></Loader>}
      <ul>
        {status === 'resolved' &&
          cast.map(({name, profile_path, character, id}) => (
            <li key={id}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
                alt={name}
              />
              <p>{name}</p>
              <p>Character: {character}</p>
            </li>
          ))}
        {status === 'rejected' && (
          <li>There is no cast list for this movie :( </li>
        )}
      </ul>
    </section>
  );
}
