import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Media from 'react-bootstrap/Media';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import faker from 'faker';

const CardPost = ({ post }) => {
  const { userName, imgUrl, likes, tags } = post;
  return (
    <Fragment>
      <Accordion defaultActiveKey='0'>
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
          <Card.Body>
            <Fragment>
              <Button>
                <span>34 </span>
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
          </Card.Body>
        </Card>
      </Accordion>
    </Fragment>
  );
};

export default CardPost;
