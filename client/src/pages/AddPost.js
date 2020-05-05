import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import FormFileLabel from 'react-bootstrap/FormFileLabel';
import { addPost } from '../actions/addPost';

const AddPost = ({ addPost }) => {
  const [postData, setPostData] = useState({
    tags: '',
    description: '',
    image: '',
  });

  const { tags, description, image } = postData;

  const handleInput = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('tags', tags);
    formData.append('description', description);
    formData.append('image', image);
    console.log(image);
    addPost(formData);
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e)} enctype='multipart/form-data'>
      <Form.Group controlId='exampleForm.ControlInput1'>
        <Form.Label>Tags:</Form.Label>
        <Form.Control
          onChange={(e) => handleInput(e)}
          name='tags'
          type='text'
          placeholder='Enter tags'
        />
      </Form.Group>

      <Form.Group>
        <FormFileLabel>Photos</FormFileLabel>
        <Form.File
          onChange={(e) => handleInput(e)}
          name='image'
          id='add-file'
          label='Add file'
          type='file'
          custom
        />
      </Form.Group>

      <Form.Group controlId='exampleForm.ControlTextarea1'>
        <Form.Label>Example textarea</Form.Label>
        <Form.Control
          onChange={(e) => handleInput(e)}
          name='description'
          as='textarea'
          rows='3'
          placeholder='Write photo description'
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Create
      </Button>
    </Form>
  );
};

AddPost.propTypes = {};

export default connect(null, { addPost })(AddPost);
