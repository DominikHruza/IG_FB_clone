const db = require('../config/db');

module.exports = class UserProfile {
  constructor(userId) {
    this.id = userId;
    this.userName = null;
    this.photos = null;
    this.followers = null;
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
};
