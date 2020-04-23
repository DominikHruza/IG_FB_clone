import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import NavTab from './components/NavTab';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Alert from './components/Alert';
import './App.css';

function App() {
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
            </Switch>
          </section>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
