import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Media from 'react-bootstrap/Media';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import faker from 'faker';
import {
  addLike,
  removeLike,
  addComment,
  removeComment,
} from '../actions/feed';

const LikeCommentSection = ({
  addLike,
  removeLike,
  addComment,
  removeComment,
  currUser,
  postId,
  likes,
  liked,
  comments,
}) => {
  const [commentText, setText] = useState('');

  const renderComments = () =>
    comments.map((comment) => (
      <Fragment>
        <li>
          <Image className='avatar' src={faker.image.avatar()} roundedCircle />
          <Media.Body>
            <div key={comment.id}>
              <h5>{comment.commentee}</h5>
              <p>{comment.commentText}</p>
              <span>{comment.createdAt}</span>
              {comment.userId === currUser.id && (
                <i
                  onClick={() => {
                    removeComment(comment.id, currUser.id);
                  }}
                  type='button'
                  className='fas fa-times-circle'
                ></i>
              )}
            </div>
          </Media.Body>
        </li>
      </Fragment>
    ));

  return (
    <Card>
      <Accordion defaultActiveKey='0'>
        <Fragment>
          <Button
            onClick={() =>
              !liked
                ? addLike(postId, currUser.id)
                : removeLike(postId, currUser.id)
            }
            className={liked ? 'liked' : ''}
          >
            <span>{likes.count} </span>
            <i className='far fa-thumbs-up'></i>
          </Button>
        </Fragment>
        <Accordion.Toggle variant='link' eventKey='1'>
          <i type='button' className='fas fa-comment'>
            <span> Comments</span>
          </i>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey='1'>
          <Media>
            <div>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  addComment(postId, currUser.id, commentText);
                }}
              >
                <Form.Group controlId='exampleForm.ControlTextarea1'>
                  <Form.Label>Comment:</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows='3'
                    onChange={(e) => {
                      setText(e.target.value);
                    }}
                  />
                  <Button type='submit'>Post</Button>
                </Form.Group>
              </Form>
            </div>
            <div>
              <ul>{renderComments()}</ul>
            </div>
          </Media>
        </Accordion.Collapse>
      </Accordion>
    </Card>
  );
};

LikeCommentSection.propTypes = {
  currUser: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth }) => {
  return { currUser: auth.user };
};

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  addComment,
  removeComment,
})(LikeCommentSection);
