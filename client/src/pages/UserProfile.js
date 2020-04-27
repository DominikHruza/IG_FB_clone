import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserProfile } from '../actions/profile';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import Spinner from 'react-bootstrap/Spinner';

const UserProfile = ({ getUserProfile, match, loadingProfile, profile }) => {
  useEffect(() => {
    getUserProfile(match.params.id);
  }, [getUserProfile, match.params.id]);

  const renderUserPhotos = () => (
    <Fragment>
      <Container>
        <Row className='justify-content-md-center'>
          {profile.photos.map((photo) => (
            <Image
              src={`https://picsum.photos/id/${photo.photoId}/1080/1080`}
            />
          ))}
        </Row>
      </Container>
    </Fragment>
  );

  return loadingProfile ? <h1>spinner</h1> : renderUserPhotos();
};

UserProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  getUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  loadingProfile: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile.profile,
  loadingProfile: state.profile.loading,
});
export default connect(mapStateToProps, { getUserProfile })(UserProfile);
