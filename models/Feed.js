const db = require('../config/db');
const POSTS_PER_SCROLL = 5;

module.exports = class Post {
  constructor(postId, userId, user, description) {
    (this.postId = postId),
      (this.userId = userId),
      (this.userName = user),
      (this.description = description),
      (this.imgUrl = null),
      (this.likes = { count: null, users: null }),
      (this.tags = null),
      (this.comments = null);
  }
  async saveToDb(imageUrl, description) {
    try {
      const result = await db.query(
        `INSERT INTO photos (image_url, user_id, photo_description) VALUES (?, ?, ?)`,
        [imageUrl, this.userId, description]
      );
      return result[0].insertId;
    } catch (error) {
      console.error(error);
    }
  }

  static async removeFromDb(postId) {
    try {
      const result = await db.query(`CALL delete_post_cascade(?)`, [postId]);
      return 'Delete Success';
    } catch (error) {
      console.error(error);
    }
  }

  async buildPost() {
    await this.queryLikes();
    await this.queryComments();
    await this.queryTags();
    this.getImg();
  }

  //Get posts id, users id and usernames
  static async queryPostsData(offset) {
    // Get a random posts from db
    try {
      const response = await db.execute(
        `
        SELECT  photos.id AS postId, 
                users.id AS userId, 
                users.username AS userName,
                photo_description AS description
        FROM photos 
        INNER JOIN users 
        ON photos.user_id = users.id
        ORDER BY photos.created_at DESC
        LIMIT ?, 5; 
        `,
        [offset]
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
      const responseUsers = await db.execute(
        `SELECT user_id FROM likes WHERE photo_id = ?;`,
        [postId]
      );
      //Set this post likes

      const dataUsers = responseUsers[0];
      this.likes['count'] = dataUsers.length;
      this.likes['users'] = dataUsers;
      return this.likes;
    } catch (error) {
      console.log(error);
    }
  }

  //query description


  //Get post comments
  async queryComments() {
    //Get post id
    const postId = this.postId;
    try {
      const response = await db.execute(
        `
        SELECT  comments.id, 
                comments.user_id as userId,
                users.username as commentee,
                comments.comment_text as commentText,
                comments.created_at as createdAt
        FROM comments
        INNER JOIN photos
        ON comments.photo_id = photos.id 
        INNER JOIN users
        ON comments.user_id = users.id
        WHERE photos.id = ?
        ORDER BY comments.created_at;
        `,
        [postId]
      );
      //Set post comments
      const data = response[0];
      this.comments = data;
    } catch (error) {
      console.log(error);
    }
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

  static async updateLikes(userId, photoId) {
    console.log(userId, photoId);
    try {
      const insert = await db.query(
        `INSERT INTO likes (user_id, photo_id) VALUES (?, ?);`,
        [userId, photoId]
      );
      const result = await db.query(
        `SELECT user_id FROM likes WHERE photo_id = ?`,
        [photoId]
      );
      return { count: result[0].length, users: result[0] };
    } catch (error) {
      console.error(error);
    }
  }

  static async deleteLikes(userId, photoId) {
    try {
      const insert = await db.query(
        `DELETE FROM likes WHERE user_id = ? AND photo_id = ?;`,
        [userId, photoId]
      );
      const result = await db.query(
        `SELECT user_id FROM likes WHERE photo_id = ?`,
        [photoId]
      );
      return { count: result[0].length, users: result[0] };
    } catch (error) {
      console.error(error);
    }
  }

  static async addComment(userId, photoId, commentText) {
    try {
      const insert = await db.query(
        `INSERT INTO comments (photo_id, user_id, comment_text) VALUES (?, ?, ?)`,
        [photoId, userId, commentText]
      );
      const comments = await db.query(
        `SELECT c.id,
                c.user_id as userId, 
                u.username as commentee,
                c.comment_text as commentText, 
                c.created_at as createdAt 
        FROM comments c INNER JOIN users u 
        ON c.user_id = u.id
        WHERE photo_id = ?`,
        [photoId]
      );

      return { count: comments[0].length, comments: comments[0] };
    } catch (error) {
      console.error(error);
    }
  }

  static async deleteComment(userId, commentId) {
    try {
      const insert = await db.query(
        `DELETE FROM comments WHERE user_id = ? AND id = ?;`,
        [userId, commentId]
      );

      return { userId, commentId };
    } catch (error) {
      console.error(error);
    }
  }
};
