const db = require('../config/db');

module.exports = class Post {
  constructor(postId, userId, user) {
    (this.postId = postId),
      (this.userId = userId),
      (this.userName = user),
      (this.imgUrl = null),
      (this.likes = null),
      (this.tags = null),
      (this.comments = null);
  }

  async buildPost() {
    await this.queryLikes();
    await this.queryComments();
    await this.queryTags();
    this.getImg();
  }
  //Get posts id, users id and usernames
  static async queryPostsData() {
    // Get a random posts from db
    try {
      const response = await db.execute(
        `
        SELECT  photos.id AS postId, 
		            users.id AS userId, 
                users.username AS userName  
        FROM photos 
        INNER JOIN users 
        ON photos.user_id = users.id
        ORDER BY rand()
        LIMIT 5; 
        `
      );

      return response[0];
    } catch (error) {
      console.log(error);
    }
  }

  //Get post likes
  async queryLikes() {
    //Get post id
    const postId = this.postId;
    try {
      //Query post likes
      const response = await db.execute(
        `
        SELECT likes.photo_id as photoId, 
               count(*) as totalLikes
        FROM likes
        INNER JOIN photos
        ON photos.id = likes.photo_id
        WHERE photos.id = ?
        GROUP BY likes.photo_id
        ORDER BY totalLikes DESC;
        `,
        [postId]
      );

      //Set this post likes
      const data = response[0][0];
      this.likes = data.totalLikes;
    } catch (error) {
      console.log(error);
    }
  }

  //Get post comments
  async queryComments() {
    //Get post id
    const postId = this.postId;
    try {
      const response = await db.execute(
        `
        SELECT  photos.id as photoId,
                users.username as commentee,
                comments.comment_text as commentText,
                comments.created_at as createdAt
        FROM comments
        INNER JOIN photos
        ON comments.photo_id = photos.id 
        INNER JOIN users
        ON comments.user_id = users.id
        WHERE photos.id = ?;
        `,
        [postId]
      );
      //Set post comments
      const data = response[0];
      this.comments = data;
    } catch (error) {}
  }

  //Get post tags
  async queryTags() {
    //Get post id
    const postId = this.postId;
    try {
      const response = await db.execute(
        `
        SELECT  photo_tags.photo_id as postId,
		            tags.tag_name as tagName
        FROM photo_tags
        INNER JOIN tags
        ON photo_tags.tag_id = tags.id
        WHERE photo_tags.photo_id = ?;
        `,
        [postId]
      );
      //Set post tags
      const data = response[0];
      this.tags = data;
    } catch (error) {
      console.log(error);
    }
  }

  // get random placeholder img
  getImg() {
    const imgUrl = `https://picsum.photos/id/${this.postId}/1080/1080`;
    this.imgUrl = imgUrl;
  }
};
