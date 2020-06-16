import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/Navbar/Navbar';
import Landing from './Pages/Landing/Landing';
import Feed from './Pages/Feed/Feed';
import Profile from './Pages/Profile/Profile';
import Auth from './Pages/Auth/Auth';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <Route exact path='/sign-in' component={Auth} />
          <Route path='/profile_:id' component={Profile} />
          <Route path='/feed' component={Feed} />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
