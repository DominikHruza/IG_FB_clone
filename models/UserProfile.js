const db = require('../config/db');

module.exports = class UserProfile {
  constructor(userId) {
    this.id = userId;
    this.photos = null;
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
        `SELECT photos.id as photoId, 
                users.id  as userId,
                (SELECT COUNT(likes.photo_id) FROM likes WHERE photo_id = photoId) AS likesNum
        FROM photos
        INNER JOIN users
        ON photos.user_id = users.id
        WHERE user_id = ?;`,
        [this.id]
      );

      //Set user photos prop based on query result
      this.photos = response[0];
    } catch (error) {
      console.error(error);
    }
  }
};
