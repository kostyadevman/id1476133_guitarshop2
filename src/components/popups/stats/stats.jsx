import React from 'react';
import PropTypes from 'prop-types';
import {capitalize} from "../../../utils";

const Stats = ({name, type, code, strings, price}) => {
  return (
    <section className="stats">
      <div className="stats__name">
        Гитара
        <span>{name.toUpperCase()}</span>
      </div>
      <div className="stats__code">Артикул: <span> {code}</span></div>
      <div className="stats__strings">{capitalize(type)},{strings} струнная</div>
      <div className="stats__price">Цена:<span>{price.toLocaleString(`fr`)}</span> ₽</div>
    </section>
  );
};

Stats.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  strings: PropTypes.number.isRequired
};

export default Stats;
