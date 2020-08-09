import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getUserProfile } from "../actions/profile";
import { deletePost } from "../actions/post";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import Card from "react-bootstrap/Card";
import ProfileInfo from "../components/ProfileInfo";

import Spinner from "react-bootstrap/Spinner";
import LikeCommentSection from "../components/LikeCommentSection";
import { setAlert } from "../actions/alerts";

const UserProfile = ({
  getUserProfile,
  deletePost,
  setAlert,
  match,
  loadingProfile,
  profile,
}) => {
  useEffect(() => {
    getUserProfile(match.params.id);
  }, []);

  const handlePostDelete = (photo) => {
    console.log("uso");
    deletePost(photo.photoId);
    setAlert("Post deleted!", "success");
  };
  console.log(profile);
  const renderPosts = () => {
    const { photos } = profile;
    return photos.length > 0 ? (
      photos.map((photo) => (
        <Card key={photo.id} className="m-4 profile-post-card">
          <Card.Title className="username">
            <Button
              className="del-post-btn"
              variant="danger"
              onClick={() => handlePostDelete(photo)}
            >
              <i class="fa fa-trash" aria-hidden="true"></i>
            </Button>
          </Card.Title>
          <Card.Body>
            <Card.Img
              className="post-img"
              variant="top"
              src={`https://picsum.photos/id/${photo.photoId}/1080/1080`}
            />
            <Card.Text className="post-text"></Card.Text>
            {photo.description ? (
              <p>{photo.description}</p>
            ) : (
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo.
              </p>
            )}
            <Button>
              <span>{photo.likesNum} </span>
              <i className="far fa-thumbs-up"></i>
            </Button>

            <Button className="btn btn-info">
              <i className="fas fa-comment">
                {" "}
                {photo.comments.length} Comments
              </i>
            </Button>
          </Card.Body>
        </Card>
      ))
    ) : (
      <h1>No photos found!</h1>
    );
  };

  return (
    <Fragment>
      <Container>
        <Row className="justify-content-md-center">
          <Col>
            {loadingProfile ? (
              <Spinner animation="border" />
            ) : (
              <ProfileInfo key={profile.id} profile={profile} />
            )}
          </Col>
          <Col>
            {loadingProfile ? <Spinner animation="border" /> : renderPosts()}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile.profile,
  loadingProfile: state.profile.loading,
});
export default connect(mapStateToProps, {
  getUserProfile,
  deletePost,
  setAlert,
})(UserProfile);
