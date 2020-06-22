import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/Navbar/Navbar';
import Landing from './Pages/Landing/Landing';
import Feed from './Pages/Feed/Feed';
import Profile from './Pages/Profile/Profile';
import Auth from './Pages/Auth/Auth';
import AlertBox from './components/Alert_box/AlertBox';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <AlertBox />
            <Switch>
              <Route path='/sign-in' component={Auth} />
              <Route path='/profile' component={Profile} />
              <PrivateRoute exact path='/feed' component={Feed} />
            </Switch>
          </section>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
