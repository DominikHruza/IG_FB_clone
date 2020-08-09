import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import FormFileLabel from "react-bootstrap/FormFileLabel";
import { addPost } from "../actions/post";
import { setAlert } from "../actions/alerts";

const AddPost = ({ user, addPost, setAlert }) => {
  const [postData, setPostData] = useState({
    tags: "",
    description: "",
    image: "",
  });

  const { tags, description, image } = postData;

  const handleInput = (e) => {
    if (e.target.name === "image")
      setPostData({ ...postData, image: e.target.files[0] });
    else setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("tags", tags);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("userId", user.id);
    if (image !== "") {
      addPost(formData);
      console.log(image);
      setAlert("Post Created", "success");
    } else {
      setAlert("Please select file", "danger");
    }
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e)} encType="">
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Group>
          <input name="image" type="file" onChange={(e) => handleInput(e)} />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Write description</Form.Label>
          <Form.Control
            onChange={(e) => handleInput(e)}
            name="description"
            as="textarea"
            rows="3"
            placeholder="Write photo description"
          />
        </Form.Group>
      </Form.Group>
      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
  );
};

const mapStateToProps = ({ auth }) => ({ user: auth.user });
export default connect(mapStateToProps, { addPost, setAlert })(AddPost);
