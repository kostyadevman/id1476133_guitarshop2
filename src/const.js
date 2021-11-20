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

