import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import faker from 'faker';
import './Profile_styles.scss';
import { getUserProfile } from '../../actions/profile';
import { StoreState } from '../../reducers';
import { AuthUser } from '../../actions/auth';
import { ProfileState } from '../../reducers/profile';
import { deletePost } from '../../actions/post';

interface ProfileProps {
  getUserProfile: Function;
  profileData: ProfileState;
  loggedUser: AuthUser | null;
  deletePost: Function;
}

const Profile = ({
  getUserProfile,
  profileData: { loading, profile },
  loggedUser,
  deletePost,
}: ProfileProps): JSX.Element => {
  useEffect(() => {
    getUserProfile(loggedUser?.id);
  }, [loggedUser?.id]);


  const handleDelete = (photoId: number) => {
    deletePost(photoId);
  };

  const renderPosts = () => {
    return profile && profile?.photos.length > 0 ? (
      profile.photos.map((photo) => (
        <div className='col-md-3 mr-2 mt-2 ' key={photo.photoId}>
          <div className='card post-info'>
            <div className='card-body'>
              {loggedUser?.id == profile.id ? (
                <button
                  onClick={() => handleDelete(photo.photoId)}
                  type='button'
                  className='close btn btn-danger pt-0 mb-2 ml-2'
                  aria-label='Close'
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              ) : null}
              {!loggedUser?.email ? (
                <img
                  className='post-img card-img-top'
                  src={`https://picsum.photos/id/${photo.photoId}/1080/1080`}
                  alt='...'
                />
              ) : (
                <img
                  src={`http://localhost:5000/images/${photo.url}`}
                  className='post-img card-img-top'
                  alt='...'
                />
              )}
              <p className='mt-2'>{photo.description}</p>
              <hr />
              <span>Likes: {photo.likesNum}</span> <br />
              <span>Comments: {photo.comments.length}</span> <br />
            </div>
          </div>
        </div>
      ))
    ) : (
      <h1>No posts found</h1>
    );
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12 mb-4'>
          {loading ? (
            <div className='spinner-border' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
          ) : (
            <div className='card'>
              <div className='card-body '>
                <img className='avatar' src={faker.image.avatar()} />
                <h5 className='card-title'>{profile?.userName}</h5>
                <h6 className='card-subtitle mb-2 text-muted'>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Sapiente, dignissimos.
                </h6>
                <p className='card-text'>
                  <button
                    type='button'
                    className='btn text-center button-pill'
                   
                  >
                    Followers: {profile?.followers.count}
                  </button>
                  <button
                    type='button'
                    className='btn button-pill'
                  >
                    Following: {profile?.follows.count}
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='row ml-1'>{renderPosts()}</div>
      
    </div>
  );
};

const mapStateToProps = ({ profileData, auth }: StoreState) => {
  return { profileData, loggedUser: auth.user };
};

export default connect(mapStateToProps, { getUserProfile, deletePost })(
  Profile
);
