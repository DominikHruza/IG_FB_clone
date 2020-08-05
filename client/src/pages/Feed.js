import React, { useEffect, useState, useRef, useCallback } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPosts } from "../actions/feed";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import CardPost from "../components/CardPost";

const Feed = ({ getPosts, posts, loading, currUser }) => {
  const [count, scrlCount] = useState(1);

  const observer = useRef();
  const lastPost = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log("visible");
        scrlCount((prevCount) => prevCount + 1);
      }
    });
    if (node) observer.current.observe(node);
    return console.log(node);
  });

  useEffect(() => {
    console.log("getPost: ", count);
    loading = true;
    getPosts(count);
  }, [count]);

  const renderPosts = () => {
    return posts.length > 0 ? (
      posts.map((post, idx) => {
        if (posts.length === idx + 1) {
          return (
            <div ref={lastPost}>
              <CardPost key={post.postId} post={post} currUser={currUser} />
            </div>
          );
        } else {
          return <CardPost key={post.postId} post={post} currUser={currUser} />;
        }
      })
    ) : (
      <h1>No posts found!</h1>
    );
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          {loading ? (
            <Spinner animation="border" role="status" />
          ) : (
            renderPosts()
          )}
        </Col>
      </Row>
    </Container>
  );
};

Feed.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  currUser: PropTypes.object.isRequired,
};

const mapStateToProps = ({ feed, auth }) => ({
  posts: feed.posts,
  loading: feed.loading,
  currUser: auth.user,
});

export default connect(mapStateToProps, { getPosts })(Feed);
