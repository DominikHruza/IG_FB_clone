import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import NavTab from './components/NavTab';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Feed from './pages/Feed';
import UserProfile from './pages/UserProfile';
import PrivateRoute from './utils/PrivateRoute';
import Alert from './components/Alert';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <NavTab />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route path='/sign-up' component={SignUp} />
              <Route path='/login' component={Login} />
              <PrivateRoute path='/feed' component={Feed} />
              <PrivateRoute path='/profile/:id' component={UserProfile} />
            </Switch>
          </section>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
