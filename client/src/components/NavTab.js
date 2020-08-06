import React, { Fragment } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../actions/auth";
import { getUserProfile } from "../actions/profile";

function NavTab({ auth: { isAuthenticated, loading, user }, logoutUser }) {
  const guestLinks = (
    <Fragment>
      <Nav.Link href="/login">Login</Nav.Link>
      <Nav.Link href="/sign-up">Sign Up</Nav.Link>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <Nav.Link href={user ? `/profile/${user.id}` : `#!`}>My profile</Nav.Link>
      <Nav.Link href={"/feed"}>Feed</Nav.Link>
      <Nav.Link href={user ? `/add-post/` : `#!`}>Add Post</Nav.Link>

      <Nav.Link onClick={logoutUser} href="#!">
        Logout
      </Nav.Link>
    </Fragment>
  );

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      fixed="top"
      className=" navbar-right"
    >
      <Navbar.Brand href="/">Picture Show</Navbar.Brand>

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
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
