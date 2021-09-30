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
  console.log(errorMessage);
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
    <section>
      {status === 'pending' && <Loader></Loader>}
      {status === 'resolved' && (
        <>
          <button type="button" onClick={onClickGo}>
            {label ?? 'Back to main page'}
          </button>
          <article>
            <h1>
              {movie.title} ({movie.release_date.slice(0, 4)})
            </h1>
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
          <ul>
            Additional information
            <li>
              <NavLink
                exact
                to={{
                  pathname: `/movies/${movieId}/cast`,
                  state: {prevPage, label},
                }}
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
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
