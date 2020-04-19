const db = require('../config/db');

module.exports = class UserProfile {
  constructor(userId) {
    this.id = userId;
    this.photos = null;
  }
  async getProfile() {}

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
