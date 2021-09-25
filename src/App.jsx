import {useState, useEffect} from 'react';
import './App.scss';
import {Route, Switch} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Fuse from './components/Fuse/Fuse';
import Navigation from './components/Navigation/Navigation';
import PopularMoviesView from './pages/PopularMovies/PopularMoviesView';
import FoundMoviesView from './pages/FoundMovies/FoundMovies';
import NotFound from './pages/NotFound/NotFound';

export default function App() {
  const [status, setStatus] = useState('idle');

  return (
    <section className="App">
      <Navigation></Navigation>
      <Switch>
        <Route path="/" exact>
          <PopularMoviesView></PopularMoviesView>
        </Route>
        <Route to="/movies">
          <FoundMoviesView></FoundMoviesView>
        </Route>
        <Route>
          <NotFound></NotFound>
        </Route>
      </Switch>
    </section>
  );
}
