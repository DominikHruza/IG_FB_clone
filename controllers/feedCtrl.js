const Feed = require('../models/Feed');
exports.getFeedData = async (req, res) => {
  try {
    // get random posts from db
    const feedPosts = await Feed.queryPostsData();
    // Loop over random posts
    const forLoopPosts = async () => {
      const postsArr = [];
      for (let index = 0; index < feedPosts.length; index++) {
        const postId = feedPosts[index].postId;
        const userId = feedPosts[index].userId;
        const userName = feedPosts[index].userName;

        // Get likes comments and tags for each post in db
        const post = new Feed(postId, userId, userName);
        await post.buildPost();
        console.log(post);
        postsArr.push(post);
      }
      return postsArr;
    };
    // Send all the posts with data(likes, comments and tags)
    const posts = await forLoopPosts();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error!');
  }
};
