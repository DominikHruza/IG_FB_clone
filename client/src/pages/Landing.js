import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Picture Share</h1>
            <p className="lead">Share phots with the world!</p>
            <div className="buttons">
              <Link to="/sign-up" className="btn btn-primary">
                Sign Up
              </Link>
              <Link to="/login" className="btn btn-light">
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
