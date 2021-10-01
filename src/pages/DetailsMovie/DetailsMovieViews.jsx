import {useEffect, useState, lazy, Suspense} from 'react';
import {fetchMovieDetails} from '../../Api/Api';
import Loader from '../../components/Loader/Loader';
import {
  useParams,
  useHistory,
  useLocation,
  NavLink,
  Route,
  Switch,
} from 'react-router-dom';
import s from './DetailsMovieViews.module.scss';
import posterNotFound from '../../img/error-404-poster-not-found.jpg';

const CastViews = lazy(() => import('../Cast/CastViews'));
const ReviewsViews = lazy(() => import('../Reviews/ReviewsViews'));

export default function DetailsMovieViews() {
  const [movie, setMovie] = useState(null);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState();
  const {movieId} = useParams();
  const location = useLocation();
  const history = useHistory();
  const prevPage = location?.state?.prevPage;
  const label = location?.state?.label;

  useEffect(() => {
    if (movieId) {
      setStatus('pending');
      (async () => {
        try {
          setMovie(await fetchMovieDetails(movieId));
          setStatus('resolved');
        } catch (e) {
          setErrorMessage(
            `Request failed with status code 404. Page with URL ".../${movieId}" not found.`,
          );
          setStatus('rejected');
        }
      })();
    }
  }, [movieId]);

  const onClickGo = () => {
    history.push(prevPage ?? '/');
  };

  return (
    <section className={s.container}>
      {status === 'pending' && <Loader></Loader>}
      {status === 'resolved' && (
        <>
          <button className={s.btnBack} type="button" onClick={onClickGo}>
            {`< ${label}` ?? '< Back to main page'}
          </button>
          <article className={s.movieCard}>
            {movie.poster_path ? (
              <img
                className={s.poster}
                src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <img className={s.poster} src={posterNotFound} alt="no poster" />
            )}

            <section className={s.movieInfo}>
              <h1 className={s.title}>
                {movie.title}
                {` (${movie.release_date.slice(0, 4)})`}
              </h1>
              <h2 className={s.overviewTitle}>Overview:</h2>
              <p className={s.overviewText}>{movie.overview}</p>
              <h2 className={s.genresTitle}>Genres:</h2>
              <ul className={s.genresList}>
                {movie.genres.map(({name, id}) => (
                  <li className={s.genresItem} key={id}>
                    {name}&emsp;
                  </li>
                ))}
              </ul>
            </section>
          </article>

          <section className={s.addInfo}>
            <h3 className={s.addInfoTitle}>Additional information</h3>
            <ul className={s.addInfoList}>
              <li className={s.addInfoListLink}>
                <NavLink
                  activeClassName={s.activeLink}
                  exact
                  to={{
                    pathname: `/movies/${movieId}/cast`,
                    state: {prevPage, label},
                  }}
                >
                  Cast
                </NavLink>
              </li>
              <li className={s.addInfoListLink}>
                <NavLink
                  activeClassName={s.activeLink}
                  exact
                  to={{
                    pathname: `/movies/${movieId}/review`,
                    state: {prevPage, label},
                  }}
                >
                  Review
                </NavLink>
              </li>
            </ul>
          </section>
          <Suspense fallback={<div>load...</div>}>
            <Switch>
              <Route exact path="/movies/:movieId/cast">
                <CastViews></CastViews>
              </Route>
              <Route exact path="/movies/:movieId/review">
                <ReviewsViews></ReviewsViews>
              </Route>
            </Switch>
          </Suspense>
        </>
      )}
      {status === 'rejected' && <h2>{errorMessage}</h2>}
    </section>
  );
}
