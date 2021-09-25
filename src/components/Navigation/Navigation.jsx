import {NavLink} from 'react-router-dom';
import s from './Navigation.module.scss';

import React from 'react';

export default function Navigation() {
  return (
    <nav className={s.navigation}>
      <NavLink exact activeClassName={s.linkActive} to="/">
        Home
      </NavLink>
      <NavLink activeClassName={s.linkActive} to="/movies">
        Movies
      </NavLink>
    </nav>
  );
}
