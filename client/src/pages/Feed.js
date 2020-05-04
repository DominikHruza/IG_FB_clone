import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPosts } from '../actions/feed';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import CardPost from '../components/CardPost';

const Feed = ({ getPosts, posts, loading, currUser }) => {
  const [count, scrlCount] = useState(0);
  useEffect(() => {
    getPosts(count);
  }, [getPosts]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [count]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    scrlCount(() => count + 1);
    getPosts(count);
  };

  const renderPosts = () => {
    return posts.length > 0 ? (
      posts.map((post) => (
        <CardPost key={post.postId} post={post} currUser={currUser} />
      ))
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
  currUser: PropTypes.object.isRequired,
};

const mapStateToProps = ({ feed, auth }) => ({
  posts: feed.posts,
  loading: feed.loading,
  currUser: auth.user,
});

export default connect(mapStateToProps, { getPosts })(Feed);
