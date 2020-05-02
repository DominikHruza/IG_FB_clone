import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Media from 'react-bootstrap/Media';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import faker from 'faker';
import { addLike } from '../actions/feed';

const LikeCommentSection = ({ addLike, currUser, postId, likes }) => {
  return (
    <Card>
      <Accordion defaultActiveKey='0'>
        <Fragment>
          <Button onClick={() => addLike(postId, currUser.id)}>
            <span>{likes.count} </span>
            <i class='far fa-thumbs-up'></i>
          </Button>
        </Fragment>

        <Accordion.Toggle variant='link' eventKey='1'>
          <Button>
            <i class='fas fa-comment'></i> <span> Comments</span>
          </Button>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey='1'>
          <Media>
            <Image
              className='avatar'
              src={faker.image.avatar()}
              roundedCircle
            />
            <Media.Body>
              <h5>Media Heading</h5>
              <p>
                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                scelerisque ante sollicitudin commodo.
              </p>
            </Media.Body>
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

export default connect(mapStateToProps, { addLike })(LikeCommentSection);
