import React, { Fragment, useRef } from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";
import { connect } from "react-redux";

import LikeCommentSection from "../components/LikeCommentSection";
import faker from "faker";

const CardPost = ({ post, currUser, loading }) => {
  const { postId, userName, imgUrl, likes, comments } = post;

  const currUserLiked = (likes) => {
    const { users } = likes;
    if (currUser) {
      //true/false
      return users.some((user) => user.user_id === currUser.id);
    }
  };

  const avatarSrc = useRef(faker.image.avatar());
  return (
    <Fragment>
      <Card key={postId} className="card-post">
        <div className="avatar">
          <Image src={avatarSrc.current} roundedCircle />
        </div>
        <Card.Title className="username">{userName}</Card.Title>
        <Card.Body>
          {loading ? (
            <Spinner animation="border" role="status" />
          ) : (
            <Card.Img className="post-img" variant="top" src={imgUrl} />
          )}

          <Card.Text className="post-text">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Card.Text>
        </Card.Body>
        <LikeCommentSection
          postId={postId}
          likes={likes}
          liked={currUserLiked(likes)}
          comments={comments}
        />
      </Card>
    </Fragment>
  );
};

const mapStateToProps = ({ loading }) => {
  return {
    loading,
  };
};
export default connect(mapStateToProps, null)(CardPost);
