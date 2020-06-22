import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getUserProfile } from '../../actions/profile';

interface ProfileProps {
  getUserProfile: Function;
}
const Profile = ({ getUserProfile }: ProfileProps): JSX.Element => {
  useEffect(() => {
    getUserProfile(2);
  }, []);
  return <button>User profile</button>;
};

export default connect(null, { getUserProfile })(Profile);
