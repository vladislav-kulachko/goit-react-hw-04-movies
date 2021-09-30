import {Route, Switch} from 'react-router-dom';
import {lazy, Suspense} from 'react';
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from './components/Navigation/Navigation';
import NotFoundViews from './pages/NotFound/NotFoundViews';
import {ToastContainer} from 'react-toastify';

const PopularMoviesViews = lazy(() =>
  import('./pages/PopularMovies/PopularMoviesViews'),
);
const DetailsMovieViews = lazy(() =>
  import('./pages/DetailsMovie/DetailsMovieViews'),
);
const FoundMoviesViews = lazy(() =>
  import('./pages/FoundMovies/FoundMoviesViews'),
);
const SearchMovies = lazy(() =>
  import('./components/SearchMovies/SearchMovies'),
);
const Fuse = lazy(() => import('./components/Fuse/Fuse'));

export default function App() {
  return (
    <section className="App">
      <Navigation></Navigation>
      <Suspense fallback={<div>load...</div>}>
        <Switch>
          <Route path="/" exact>
            <Fuse>
              <PopularMoviesViews></PopularMoviesViews>
            </Fuse>
          </Route>
          <Route path="/movies" exact>
            <SearchMovies></SearchMovies>
            <Fuse>
              <FoundMoviesViews></FoundMoviesViews>
            </Fuse>
          </Route>
          <Route path="/movies/:movieId">
            <Fuse>
              <DetailsMovieViews></DetailsMovieViews>
            </Fuse>
          </Route>
          <Route>
            <NotFoundViews></NotFoundViews>
          </Route>
        </Switch>
      </Suspense>
      <ToastContainer></ToastContainer>
    </section>
  );
}
