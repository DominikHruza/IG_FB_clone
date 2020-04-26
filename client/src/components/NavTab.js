import React, { Fragment } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../actions/auth';
import { getUserProfile } from '../actions/profile';

function NavTab({ auth: { isAuthenticated, loading, user }, logoutUser }) {
  const guestLinks = (
    <Fragment>
      <Nav.Link href='/login'>Login</Nav.Link>
      <Nav.Link href='/sign-up'>SignUp</Nav.Link>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <Nav.Link href='/profile'>Profile</Nav.Link>
      <Nav.Link onClick={logoutUser} href='#!'>
        Logout
      </Nav.Link>
    </Fragment>
  );

  return (
    <Navbar bg='dark' expand='lg'>
      <Navbar.Brand href='/'>IF_FB_Clone</Navbar.Brand>
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

Navbar.propTypes = {
  logout: PropTypes.func,
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { logoutUser, getUserProfile })(NavTab);
