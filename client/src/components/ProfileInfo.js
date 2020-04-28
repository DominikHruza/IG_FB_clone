import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Image from 'react-bootstrap/Image';
import faker from 'faker';
import PropTypes from 'prop-types';

const ProfileInfo = ({ profile }) => {
  const { followers, follows } = profile;
  return (
    <Card style={{ width: '18rem' }}>
      <Image className='avatar' src={faker.image.avatar()} roundedCircle />
      <Card.Body>
        <Card.Title className='username'>{profile.userName}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
      <ListGroup className='list-group-flush'>
        <ListGroupItem>
          <span>Followers: {followers.count}</span>
        </ListGroupItem>
        <ListGroupItem>
          <span>Following: {follows.count}</span>
        </ListGroupItem>
      </ListGroup>
      <Card.Body>
        <Button variant='primary'>Edit Profile</Button>
      </Card.Body>
    </Card>
  );
};

ProfileInfo.propTypes = {
  userName: PropTypes.string.isRequired,
};

/* const mapStateToProps = (state) => (
  {profile: }
) */
export default connect(null)(ProfileInfo);
