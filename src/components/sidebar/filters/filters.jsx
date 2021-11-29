import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFilters, getGuitars} from "../../../store/selectors";
import {setFilterValue} from "../../../store/action";
import {getMaxPrice, getMinPrice} from "../../../utils";
import {FilterType, guitarMap, GuitarType, numberKeys, stringsMap} from "../../../const";

const Filters = () => {

  const dispatch = useDispatch();
  const filters = useSelector(getFilters);
  const items = useSelector(getGuitars);
  const min = getMinPrice(items);
  const max = getMaxPrice(items);

  const [enableStrings, setEnableStrings] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);


  const _prettify = (value) => {
    return value ? value.toLocaleString(`fr`) : ``;
  };

  const getEnabledStrings = () => {
    let strings = [];
    const typesChecked = filters.types.filter((type) => type.value === true);
    typesChecked.forEach((type) => {
      strings.push(...stringsMap[type.name]);
    });

    return [...new Set(strings)];
  };

  const _handleTypeChange = (evt) => {
    const {name, checked} = evt.target;
    dispatch(setFilterValue(FilterType.TYPE, name, checked));
  }

  const _handleStringsChange = (evt) => {
    const {name, checked} = evt.target;
    dispatch(setFilterValue(FilterType.STRINGS, name, checked));
  };

  const _handleKeyPress = (evt) => {
    if (!numberKeys.includes(evt.key)) {
      evt.preventDefault();
    }
  }

  const _handleMinChange = (evt) => {
    setMinPrice(Number(evt.target.value.replace(/\s/g, ``)));
  }

  const _handleMaxChange = (evt) => {
    setMaxPrice(Number(evt.target.value.replace(/\s/g, ``)));
  }

  const _handleMinBlur = (evt) => {
    let {value} = evt.target;

    value = Number(value.replace(/\s/g, ``));

    let currentMin = null;
    if (value < min) {
      currentMin = min;
    } else if (value > max) {
      currentMin = max;
    } else {
      currentMin = value;
    }

    setMinPrice(currentMin);
    dispatch(setFilterValue(FilterType.PRICE, `min`, currentMin));
    if (currentMin > Number(maxPrice)) {
      dispatch(setFilterValue(FilterType.PRICE, `max`, currentMin));
      setMaxPrice(currentMin);
    }
  }

  const _handleMaxBlur = (evt) => {
    let {value} = evt.target;

    value = Number(value.replace(/\s/g, ``));

    let currentMax = null;
    if (value > max) {
      currentMax = max;
    } else if (value < min) {
      currentMax = min
    } else {
      currentMax = value;
    }

    setMaxPrice(currentMax);
    dispatch(setFilterValue(FilterType.PRICE, `max`, currentMax))

    if (currentMax < Number(minPrice)) {
      dispatch(setFilterValue(FilterType.PRICE, `min`, currentMax))
      setMinPrice(currentMax);
    } else if (minPrice === 0 && minPrice !== min) {
      setMinPrice(min);
      dispatch(setFilterValue(FilterType.PRICE, `min`, min))
    }
  }

  useEffect(() => {
    const typesChecked = filters.types.filter((item) => item.value === true);
    const stringsChecked = filters.strings.filter((item) => item.value === true);
    stringsChecked.forEach((string) => {
      if (!enableStrings.includes(parseInt(string.name))) {
        (typesChecked.length > 0) ?
          dispatch(setFilterValue(FilterType.STRINGS, string.name, false)) :
          setEnableStrings(stringsMap[GuitarType.ALL]);
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableStrings])

  useEffect(() => {

    setEnableStrings(getEnabledStrings());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.types])

  return (
    <form className="filters">
        <div className="filters__fieldset">
          <p className="filters__title">Цена, <span>₽</span></p>
          <div className="filters__price-wrapper">
            {filters.price.map((filter) => (
              <div key={filter.name}>
                <input
                  className={`filters__price filters__price--${filter.name}`}
                  id={filter.id}
                  name={filter.id}
                  type="text"
                  value={filter.name === 'min' ? _prettify(minPrice) : _prettify(maxPrice)}
                  placeholder={filter.name === 'min' ? _prettify(min) : _prettify(max)}
                  onChange={filter.name === 'min' ? _handleMinChange : _handleMaxChange}
                  onBlur={filter.name === 'min' ? _handleMinBlur : _handleMaxBlur}
                  onKeyPress={_handleKeyPress}
                  autoComplete="off"
                />
                <label
                  className={`filters__label filters__label--${filter.name} visually-hidden`}
                  htmlFor={filter.name}
                >
                  {filter.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="filters__fieldset filters__fieldset--type">
          <p className="filters__title">Тип гитар</p>
          {filters.types.map((filter) => (
            <div key={filter.id}>
              <input
                className={`filters__checkbox filters__checkbox--${filter.id} visually-hidden`}
                id={filter.id}
                name={filter.name}
                type="checkbox"
                checked={filter.value}
                onChange={_handleTypeChange}
              />
              <label
                className={`filters__label filters__label--${filter.id}`}
                htmlFor={filter.id}
              >
                {guitarMap[filter.name]}
              </label>
            </div>
          ))}
        </div>
        <div className="filters__fieldset filters__fieldset--strings">
          <p className="filters__title">Количество струн</p>
          {filters.strings.map((filter) => (
            <div key={filter.id}>
              <input
                className={`filters__checkbox filters__checkbox--${filter.id} visually-hidden`}
                id={filter.id}
                name={filter.name}
                type="checkbox"
                checked={filter.value}
                disabled={enableStrings.length === 0 ? false : !enableStrings.includes(parseInt(filter.name))}
                onChange={_handleStringsChange}
              />
              <label
                className={`filters__label filters__label--${filter.name}`}
                htmlFor={filter.id}
              >
                {filter.name}
              </label>
            </div>
          ))}
        </div>
      </form>
  );
};

export default Filters;
