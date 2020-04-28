const db = require('../config/db');

module.exports = class UserProfile {
  constructor(userId) {
    this.id = userId;
    this.userName = null;
    this.photos = {};
    this.followers = {
      list: null,
    };
    this.follows = {
      list: null,
    };
  }

  async getProfile() {
    try {
      const response = await db.query(
        'SELECT username FROM users where id = ?',
        [this.id]
      );

      //If no user in db return null
      if (!response[0][0]) {
        return null;
      } else {
        return response[0];
      }
    } catch (err) {
      console.error(error);
    }
  }

  async getUserPhotos() {
    try {
      const response = await db.query(
        `SELECT username,
                photos.id as photoId, 
                users.id as userId,
                (SELECT COUNT(likes.photo_id) FROM likes WHERE photo_id = photoId) AS likesNum       
        FROM photos
        INNER JOIN users
        ON photos.user_id = users.id
        WHERE photos.user_id = ?;`,
        [this.id]
      );

      //Set user photos prop based on query result
      const data = response[0];
      this.userName = data[0].username;
      this.photos = data;
    } catch (error) {
      console.error(error);
    }
  }

  async getComments() {
    for (let index = 0; index < this.photos.length; index++) {
      const photo = this.photos[index];
      const result = await db.query(
        `SELECT username, comment_text, comments.created_at FROM comments
         INNER JOIN users
         ON comments.user_id = users.id
         INNER JOIN photos
         ON comments.photo_id = photos.id
         WHERE photo_id = ?;`,
        [photo.photoId]
      );

      photo.comments = result[0];
    }
  }

  async getFollowers() {
    try {
      const responseCount = await db.query(
        `SELECT COUNT(followee_id) AS count FROM follows WHERE followee_id = ?;`,
        [this.id]
      );
      const responseList = await db.query(
        `SELECT users.id, users.username FROM follows 
        INNER JOIN users
        ON follows.follower_id = users.id
        WHERE followee_id = ?;`,
        [this.id]
      );

      const followerCount = responseCount[0][0];
      const followerList = responseList[0];

      this.followers = followerCount;
      this.followers.list = followerList;
    } catch (error) {
      console.error(error);
    }
  }

  async getFollows() {
    try {
      const responseCount = await db.query(
        `SELECT count(followee_id) AS count FROM follows WHERE follower_id = ?;`,
        [this.id]
      );
      const responseList = await db.query(
        `SELECT users.id, users.username FROM follows 
        INNER JOIN users
        ON follows.followee_id = users.id
        WHERE follower_id = ?;`,
        [this.id]
      );

      const followsCount = responseCount[0][0];
      const followsList = responseList[0];

      this.follows = followsCount;
      this.follows.list = followsList;
    } catch (error) {
      console.error(error);
    }
  }
};
