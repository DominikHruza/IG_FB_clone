import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../actions/auth";

const Login = ({ loginUser, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    console.log("login: ", email, " ", password);
    e.preventDefault();
    loginUser(email, password);
  };

  // Redirect if user logged in
  if (isAuthenticated) {
    return <Redirect to="/feed" />;
  }

  return (
    <div>
      <h1 className="large text-primary">Login</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Login Into Your Account
      </p>
      <form className="form" onSubmit={(e) => handleFormSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => handleInput(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={(e) => handleInput(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/sign-up">Sign In</Link>
      </p>
    </div>
  );
};
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { loginUser })(Login);
