import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { StoreState } from '../../reducers';
import { userLogout } from '../../actions/auth';
import { AuthState } from '../../reducers/auth';
import { getUserProfile } from '../../actions/profile';

interface NavbarProps {
  auth: AuthState;
  userLogout: Function;
}

const Navbar = ({
  auth: { isAuthenticated, loading },
  userLogout,
}: NavbarProps): JSX.Element => {
  //If user not logged in
  const renderGuestLinks = (
    <Fragment>
      <li className='nav-item '>
        <Link to='/sign-in' className='nav-link' href='/'>
          Sign In
        </Link>
      </li>
    </Fragment>
  );

  //If user logged in
  const renderUserLinks = (
    <Fragment>
      <li className='nav-item active'>
        <Link to='/feed' className='nav-link' href='#'>
          Feed <span className='sr-only'>(current)</span>
        </Link>
      </li>
      <li className='nav-item'>
        <Link to='/profile:id' className='nav-link' href='#'>
          My Profile
        </Link>
      </li>
      <li className='nav-item '>
        <Link to='/' onClick={() => userLogout()} className='nav-link' href='/'>
          Logout
        </Link>
      </li>
    </Fragment>
  );

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <Link to='/feed' className='navbar-brand' href='#'>
        Insta Clone
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>

      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav mr-auto'>
          {!loading && (
            <Fragment>
              {isAuthenticated ? renderUserLinks : renderGuestLinks}
            </Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ auth }: StoreState) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps, { userLogout })(Navbar);
