import React from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Image from "react-bootstrap/Image";
import faker from "faker";
import PropTypes from "prop-types";

const ProfileInfo = ({ profile }) => {
  const { followers, follows } = profile;
  return (
    <div className="floater ">
      <Card style={{ width: "18rem" }} className="profile-card">
        <Image className="avatar" src={faker.image.avatar()} roundedCircle />
        <Card.Body>
          <Card.Title>{profile.userName}</Card.Title>
          <Card.Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem className="profile-card-follows">
            <span>Followers: {followers.count}</span>
          </ListGroupItem>
          <ListGroupItem className="profile-card-follows">
            <span>Following: {follows.count}</span>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </div>
  );
};

export default connect(null)(ProfileInfo);
