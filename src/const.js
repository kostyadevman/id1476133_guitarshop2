export const AppRoute = {
  ROOT: `/`,
  CART: `/cart`,
  ABOUT: `/about`,
  SERVICE: `/service`,
  PLACE: `/place`,
  FAQ: `/faq`,
  RETURN: `/return`,
  BLOG: `/blog`,
  PAGE_NOT_FOUND: `/page-not-found`
};

export const MenuType = {
  header: `header`,
  footer: `footer`
};

export const GuitarType = {
  UKULELE: "укулеле",
  ACOUSTIC: "акустическая гитара",
  ELECTRIC: "электрогитара",
  ALL: "все гитары"
}

export const guitarMap = {
  [GuitarType.ACOUSTIC]: `Акустические гитары`,
  [GuitarType.ELECTRIC]: `Электрогитары`,
  [GuitarType.UKULELE]: `Укулеле`,
}

export const StringAmount = {
  FOUR: `4`,
  SIX: `6`,
  SEVEN: `7`,
  TWELVE: `12`
}

export const stringsMap = {
  [GuitarType.ACOUSTIC]: [6, 7, 12],
  [GuitarType.ELECTRIC]: [4, 6, 7],
  [GuitarType.UKULELE]: [4],
  [GuitarType.ALL]: [4, 6, 7, 12]
}

export const MENU_SETTINGS = {
  header: {
    className: `header__menu menu`,
    listClassName: `menu__list`,
    linkClassName: `menu__link`,
    items: [
      {link: AppRoute.ROOT, text: `Каталог`},
      {link: AppRoute.PLACE, text: `Где купить?`},
      {link: AppRoute.ABOUT, text: `О компании`},
      {link: AppRoute.SERVICE, text: `Cервис-центры`}
    ]
  },
  footer: {
    className: `footer__menu menu`,
    listClassName: `menu__list menu__list--footer`,
    linkClassName: `menu__link menu__link--footer`,
    items: [
      {link: AppRoute.PLACE, text: `Где купить?`},
      {link: AppRoute.BLOG, text: `Блог`},
      {link: AppRoute.FAQ, text: `Вопрос - ответ`},
      {link: AppRoute.RETURN, text: `Возврат`},
      {link: AppRoute.SERVICE, text: `Cервис-центры`}
    ]
  },
};

export const ITEMS_PER_PAGE = 9;

export const FilterType = {
  STRINGS: `strings`,
  PRICE: `price`,
  TYPE: `types`
}

export const SortType = {
  DEFAULT: `none`,
  BY_PRICE: `byPrice`,
  BY_RATING: `byRating`
}

export const SortDirection = {
  DEFAULT: `none`,
  INC: `increase`,
  DEC: `decrease`
}

export const sortTypes = [
  {
    id: 1,
    type: SortType.BY_PRICE,
    text: `по цене`
  },
  {
    id: 2,
    type: SortType.BY_RATING,
    text: `по популярности`
  },
];

export const sortMap = {
  [SortType.BY_PRICE]: `price`,
  [SortType.BY_RATING]: `rating`
}

export const PromoCode = {
    GITARAHIT: 'GITARAHIT',
    SUPERGITARA: 'SUPERGITARA',
    GITARA2020: 'GITARA2020'
};

export const promoCodes = [
  'GITARAHIT',
  'SUPERGITARA',
  'GITARA2020'
]

export const PromoCodesMap = {
    GITARAHIT: 0.1,
    SUPERGITARA: 700,
    GITARA2020: 3000
};

export const MAX_SALE = 0.3;


export const PopupType = {
  ADD: `popup-add`,
  DELETE: `popup-delete`,
  SUCCESS: `popup-success`
}

export const MARGIN_PAGES_DISPLAY = 1

export const PAGE_RANGE_DISPLAY_ONE = 1;
export const PAGE_RANGE_DISPLAY_TWO = 2;

export const PAGE_HIDDEN = 1

export const numberKeys = [`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`]

export const NO_PROMOCODE = `NO_PROMOCODE`;
