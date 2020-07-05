const Feed = require('../models/Feed');

exports.getFeedData = async (req, res) => {
  try {
    const { count } = req.body;
    // get random posts from db
    const feedPosts = await Feed.queryPostsData(count);
    // Loop over random posts
    const forLoopPosts = async () => {
      const postsArr = [];
      for (let index = 0; index < feedPosts.length; index++) {
        const postId = feedPosts[index].postId;
        const userId = feedPosts[index].userId;
        const userName = feedPosts[index].userName;
        const description = feedPosts[index].description;

        // Get likes comments and tags for each post in db
        const post = new Feed(postId, userId, userName, description);
        await post.buildPost();
        postsArr.push(post);
      }
      return postsArr;
    };
    console.log('pozvao api get feed');
    // Send all the posts with data(likes, comments and tags)
    const posts = await forLoopPosts();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error!');
  }
};

exports.updateLikes = async (req, res) => {
  try {
    const { postId, userId } = req.body;
    const result = await Feed.updateLikes(userId, postId);

    res.json({ msg: 'Like Added', post_id: postId, ...result });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error!');
  }
};

exports.deleteLike = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    console.log('delete', userId, postId);
    const result = await Feed.deleteLikes(userId, postId);
    res.json({ msg: 'Like Deleted', post_id: postId, ...result });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error!');
  }
};

exports.addComment = async (req, res) => {
  try {
    const { userId, postId, commentText } = req.body;
    console.log('comment: ', userId, postId);
    const result = await Feed.addComment(userId, postId, commentText);
    res.json({ msg: 'Comment posted', post_id: postId, ...result });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error!');
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { userId, commentId } = req.body;
    console.log('comment: ', userId, commentId);
    const result = await Feed.deleteComment(userId, commentId);
    res.json({ msg: 'Comment deleted', ...result });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error!');
  }
};
