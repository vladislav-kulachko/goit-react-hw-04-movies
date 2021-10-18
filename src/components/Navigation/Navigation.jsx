import {NavLink} from 'react-router-dom';
import s from './Navigation.module.scss';

export default function Navigation() {
  return (
    <nav className={s.navigation}>
      <NavLink exact className={s.link} activeClassName={s.linkActive} to="/">
        Home
      </NavLink>
      <NavLink className={s.link} activeClassName={s.linkActive} to="/movies">
        Movies
      </NavLink>
    </nav>
  );
}
