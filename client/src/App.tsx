import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/Navbar/Navbar';
import Landing from './Pages/Landing/Landing';
import Feed from './Pages/Feed/Feed';
import Profile from './Pages/Profile/Profile';
import SignIn from './Pages/Profile/Profile';
import LogIn from './Pages/Profile/Profile';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <Route exact path='/Sign-In' component={SignIn} />
          <Route exact path='/Log-In' component={LogIn} />
          <Route path='/profile_:id' component={Profile} />
          <Route path='/feed' component={Feed} />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
