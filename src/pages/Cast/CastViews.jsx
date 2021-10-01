import {fetchMovieCredits} from '../../Api/Api';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import s from './CastViews.module.scss';
import oops from '../../img/oops_640.jpg';

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
    <section className={s.container}>
      {status === 'pending' && <Loader></Loader>}
      <ul className={s.list}>
        {status === 'resolved' &&
          cast.map(({name, profile_path, character, id}) => (
            <li className={s.item} key={id}>
              {profile_path ? (
                <div className={s.imgContainer}>
                  <img
                    className={s.avatar}
                    src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
                    alt={name}
                  />
                </div>
              ) : (
                <div className={s.imgContainer}>
                  <img className={s.avatar} src={oops} alt="no poster" />
                </div>
              )}

              <div className={s.info}>
                <p className={s.name}>{name}</p>
                <p className={s.character}>Character: {character}</p>
              </div>
            </li>
          ))}
        {status === 'rejected' && <li>There is no cast list for this movie</li>}
      </ul>
    </section>
  );
}
