import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/feed';

import { StoreState } from '../../reducers';

import FeedCard from '../../components/FeedCard/FeedCard';


interface FeedProps {
    getPosts:Function,
    
}
const Feed = ({ getPosts, posts, loading, currUser }: any): JSX.Element => {
    const [count, scrlCount] = useState(0);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        console.log('called');
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

    useEffect(() => {
        console.log('getPost: ', count);
        loading = true;
        getPosts(count);
    }, [count]);

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
            document.documentElement.offsetHeight
        )
            return;
        scrlCount(count + 5);
    }; 
    const renderPosts = () => {
    return posts.length > 0 ? (
        posts.map((post: any) => (
            <FeedCard currUser={currUser} post={post} key={post.postId}/>
        ))
    ) : (
        <h1>No posts found!</h1>
    );
    };
    return <div className="container">
        <div className="row justify-content-center">
            <div className="col-6">
            {loading ? (
                <div className='spinner-border' role='status'>
                <span className='sr-only'>Loading...</span>
            </div>
            ) : (
                renderPosts()
            )}
            </div>
        </div>
    </div>;
};

const mapStateToProps = ({ feedData, auth }: StoreState) => ({
    posts: feedData.posts,
    loading: feedData.loading,
    currUser: auth.user,
  });

export default connect(mapStateToProps, { getPosts })(Feed);
