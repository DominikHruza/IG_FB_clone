import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPosts } from '../actions/feed';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import CardPost from '../components/CardPost';

const Feed = ({ getPosts, posts, loading }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const renderPosts = () => {
    return posts.length > 0 ? (
      posts.map((post) => <CardPost key={post.postId} post={post} />)
    ) : (
      <h1>No posts found!</h1>
    );
  };
  return (
    <Container>
      <Row>
        <Col>
          {loading ? (
            <Spinner animation='border' role='status' />
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
};

const mapStateToProps = ({ feed }) => ({
  posts: feed.posts,
  loading: feed.loading,
});

export default connect(mapStateToProps, { getPosts })(Feed);
