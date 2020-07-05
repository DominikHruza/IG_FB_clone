import React from 'react'
import { StoreState } from '../../reducers';
import { connect } from 'react-redux';
import {addLike, removeLike} from '../../actions/feed'
import './CommentLikeSection.style.scss'




const CommentLikeSection:React.FunctionComponent<any> = ({
    addLike,
    removeLike,
    currUser,
    postId,
    likes,
    liked,
    comments,
  }:any) => {
    return (
        <div className="like-comment-btns">
            <button
            onClick={() =>
              !liked
                ? addLike(postId, currUser.id)
                : removeLike(postId, currUser.id)
            }
            className=  {`like-button ${liked ? 'liked' : ''}`}
          >
            <span>{likes.count} </span>
            
          </button>
          <button>
              <span>100</span>
              <i className='fas fa-comment'>
              <span> Comments</span>
            </i>
          </button>s
        </div>
    )
}

const mapStateToProps = ({ auth }: StoreState) => {
    return { currUser: auth.user };
};

export default connect(mapStateToProps, {
    addLike,
    removeLike,
    
  })(CommentLikeSection);