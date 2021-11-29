import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Helmet} from "react-helmet";
import Header from '../layout/header/header';
import Main from '../main/main';
import PageNotFound from '../pages/page-not-found/page-not-found';
import Footer from "../layout/footer/footer";
import {AppRoute} from '../../const';
import droidSans from "../../fonts/droid-sans.woff2";
import droidSansBold from "../../fonts/droid-sans-bold.woff2";
import poppins from "../../fonts/poppins-v15-latin-regular.woff2";
import Catalog from "../pages/catalog/catalog";
import Cart from "../pages/cart/cart";

const App = () => {
  return (
    <React.Fragment>
      <Helmet>
        <link rel="preload" href={droidSans} as="font" type="font/woff2" crossOrigin="anonymous"/>
        <link rel="preload" href={droidSansBold} as="font" type="font/woff2" crossOrigin="anonymous"/>
        <link rel="preload" href={poppins} as="font" type="font/woff2" crossOrigin="anonymous"/>
      </Helmet>
      <Header />
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <Main>
            <Catalog />
          </Main>
        </Route>
        <Route exact path={AppRoute.CART}>
          <Main>
            <Cart />
          </Main>
        </Route>
        <Route>
          <Main>
            <PageNotFound />
          </Main>
        </Route>
      </Switch>
      <Footer />
    </React.Fragment>
  );
};

export default App;
