import React from 'react'
import faker from 'faker'
import CommentLikeSection from '../../components/CommentLikeSection/CommentLikeSection';


const FeedCard = ({post, currUser}: any) => {
    const currUserLiked = (likes: any) => {
        const { users } = likes;
        //true/false
        return users.some((user: any) => user.user_id === currUser.id);
      };

    return (
      
    <div className="card  m-3 p-2" key={post.postId}>
        <div className="pl-3 pt-3">
            <img  className='avatar' src={faker.image.avatar()} />
            <h5 className="card-title">{post.userName}</h5>
        </div>
    <div className="card-body">
        <img  className="card-img-top" src={post.imgUrl} />
        <p className="card-text">{post.description}</p>
    </div>
    <CommentLikeSection 
          postId={post.postId}
          likes={post.likes}
          liked={currUserLiked(post.likes)}
          comments={post.comments}/>
    </div>
        
    )
}

export default FeedCard
