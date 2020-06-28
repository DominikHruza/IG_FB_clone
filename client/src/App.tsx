import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/Navbar/Navbar';
import Landing from './Pages/Landing/Landing';
import Feed from './Pages/Feed/Feed';
import Profile from './Pages/Profile/Profile';
import Auth from './Pages/Auth/Auth';
import AlertBox from './components/Alert_box/AlertBox';
import PrivateRoute from './utils/PrivateRoute/PrivateRoute';
import setAuthToken from './utils/setToken';
import { loadUser } from './actions/auth';
import AddPost from './Pages/AddPost/AddPost';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch<any>(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <AlertBox />
            <Switch>
              <Route exact path='/sign-in' component={Auth} />
              <PrivateRoute exact path='/profile/:id' component={Profile} />
              <PrivateRoute exact path='/feed' component={Feed} />
              <PrivateRoute exact path='/add-post/:id' component={AddPost} />
            </Switch>
          </section>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
