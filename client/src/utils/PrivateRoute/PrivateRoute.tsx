import React, { FunctionComponentElement, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../reducers';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  isAuthenticated: boolean;
  loading: boolean;
  rest?: any;
  exact: boolean;
  path: string;
  Component: () => JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps | any> = ({
  Component,
  isAuthenticated,
  loading,
  ...rest
}) => {
  if (isAuthenticated && !loading) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
  return <Redirect to='/sign-in' />;
};

const mapStateToProps = ({ auth }: StoreState) => {
  return {
    isAuthenticated: auth.isAuthenticated,
    loading: auth.loading,
  };
};
export default connect(mapStateToProps)(PrivateRoute);
