import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';

import faker from 'faker';
const CardPost = ({ post }) => {
  const { userName, imgUrl, likes, tags } = post;
  return (
    <Fragment>
      <Card style={{ width: '18rem' }}>
        <Card.Img className='avatar' variant='top' src={faker.image.avatar()} />
        <Card.Title className='username'>{userName}</Card.Title>
        <Card.Body>
          <Card.Img className='post-img' variant='top' src={imgUrl} />
          <Card.Text className='post-text'>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default CardPost;
