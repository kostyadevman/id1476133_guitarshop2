import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {MENU_SETTINGS} from '../../const';


const Menu = ({menuType}) => {

  return (
    <nav className={MENU_SETTINGS[menuType].className}>
      <ul className={MENU_SETTINGS[menuType].listClassName}>
        {MENU_SETTINGS[menuType].items.map((item) => (
          <li className="menu__item" key={item.text}>
            <NavLink to={item.link} className={MENU_SETTINGS[menuType].linkClassName}>{item.text}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Menu.propTypes = {
  menuType: PropTypes.string.isRequired,
};

export default Menu;

