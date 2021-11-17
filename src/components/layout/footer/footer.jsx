import React from 'react';
import Menu from '../../menu/menu';

const Footer = () => {
  return (
    <footer className="footer">
      <h2 className="footer__title visually-hidden">Подвал</h2>
      <div className="container">
        <Menu />
      </div>
    </footer>
  );
};

export default Footer;
