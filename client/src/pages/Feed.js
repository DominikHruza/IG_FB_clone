import React, { useEffect, useState, useRef, useCallback } from "react";
import { connect } from "react-redux";
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
    console.log(loading);
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        scrlCount((prevCount) => prevCount + 1);
        loading = true;
      }
    });
    if (node) observer.current.observe(node);
  });

  useEffect(() => {
    getPosts(count);
  }, [count, loading]);

  const renderPosts = () => {
    return posts.length > 0 ? (
      posts.map((post, idx) => {
        if (posts.length === idx + 1) {
          return (
            <div key={idx} ref={lastPost}>
              <CardPost post={post} currUser={currUser} />
            </div>
          );
        } else {
          return <CardPost key={idx} post={post} currUser={currUser} />;
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

const mapStateToProps = ({ feed, auth }) => ({
  posts: feed.posts,
  loading: feed.loading,
  currUser: auth.user,
});

export default connect(mapStateToProps, { getPosts })(Feed);
