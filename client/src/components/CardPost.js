import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

import LikeCommentSection from '../components/LikeCommentSection';
import faker from 'faker';

const CardPost = ({ post, currUser }) => {
  const { postId, userName, imgUrl, likes } = post;

  const currUserLiked = (likes) => {
    const { users } = likes;
    //true/false
    return users.some((user) => user.user_id === currUser.id);
  };

  return (
    <Fragment>
      <Card className='m-4' style={{ width: '18rem' }}>
        <Image className='avatar' src={faker.image.avatar()} roundedCircle />
        <Card.Title className='username'>{userName}</Card.Title>
        <Card.Body>
          <Card.Img className='post-img' variant='top' src={imgUrl} />
          <Card.Text className='post-text'>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
        <LikeCommentSection
          postId={postId}
          likes={likes}
          liked={currUserLiked(likes)}
        />
      </Card>
    </Fragment>
  );
};

export default CardPost;
