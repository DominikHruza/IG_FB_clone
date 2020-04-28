import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserProfile } from '../actions/profile';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import ProfileInfo from '../components/ProfileInfo';

import Spinner from 'react-bootstrap/Spinner';

const UserProfile = ({ getUserProfile, match, loadingProfile, profile }) => {
  useEffect(() => {
    getUserProfile(match.params.id);
  }, [getUserProfile, match.params.id]);

  console.log(profile);
  const renderPosts = () => {
    const { photos } = profile;
    return photos.length > 0 ? (
      photos.map((photo) => (
        <Card className='m-4' style={{ width: '18rem' }}>
          <Card.Title className='username'></Card.Title>
          <Card.Body>
            <Card.Img
              className='post-img'
              variant='top'
              src={`https://picsum.photos/id/${photo.photoId}/1080/1080`}
            />
            <Card.Text className='post-text'>
              <span>Tags:</span>
            </Card.Text>
            <Card.Text className='post-text'>
              <span>Likes: {photo.likesNum}</span>
              <span>Comments:</span>
            </Card.Text>
          </Card.Body>
        </Card>
      ))
    ) : (
      <h1>No photos found!</h1>
    );
  };

  return (
    <Fragment>
      <Container>
        <Row className='justify-content-md-center'>
          <Col>
            {loadingProfile ? (
              <Spinner animation='border' />
            ) : (
              <ProfileInfo key={profile.id} profile={profile} />
            )}
          </Col>
          <Col>
            {loadingProfile ? <Spinner animation='border' /> : renderPosts()}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
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
