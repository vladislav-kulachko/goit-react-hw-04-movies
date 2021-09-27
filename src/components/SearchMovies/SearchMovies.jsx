import {useState} from 'react';
import {Link, Route, useHistory, useLocation} from 'react-router-dom';
import s from './SearchMovies.module.scss';
import SearchIcon from '@material-ui/icons/Search';
import {toast, Flip} from 'react-toastify';
import FoundMoviesView from '../../pages/FoundMoviesView/FoundMoviesView';

export default function SearchMovies() {
  const [query, setQuery] = useState('');
  const history = useHistory();
  const location = useLocation();
  const submitHandler = e => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.info('Please enter at least a couple of letters:)', {
        theme: 'colored',
        position: 'bottom-center',
        autoClose: 5000,
        transition: Flip,
        toastId: 1,
      });
    } else {
      history.push({...location, search: `query=${query}`});
      // onQueryUpdate(query);
    }
    setQuery('');
  };
  const inputHandler = e => {
    setQuery(e.target.value.toLowerCase());
  };
  return (
    <>
      <form className={s.searchForm} onSubmit={submitHandler}>
        <input
          onChange={inputHandler}
          value={query}
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />
        <button type="submit" className={s.button}>
          <SearchIcon style={{fontSize: 26, color: 'yellowgreen'}}></SearchIcon>
        </button>
      </form>
      <FoundMoviesView query={query}></FoundMoviesView>
    </>
  );
}
