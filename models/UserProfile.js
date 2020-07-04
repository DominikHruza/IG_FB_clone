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

  async getUsername() {
    try {
      const response = await db.query(
        'SELECT username FROM users where id = ?',
        [this.id]
      );
      console.log(response[0][0]['username'])  
      //If no user in db return false
      if (!response[0][0]['username']) {
        return false;
      } else {
        this.userName =  response[0][0]['username'];
        return true
      }
    } catch (err) {
      console.error(error);
    }
  }

  async getUserPhotos() {
    try {
      const response = await db.query(`CALL getUserPhotos(?)`, [this.id]);

      //Set user photos prop based on query result
      const data = response[0];
      this.userName = data[0][0].username;
      this.photos = data[0];
    } catch (error) {
      console.error(error);
    }
  }

  async getComments() {
    for (let index = 0; index < this.photos.length; index++) {
      const photo = this.photos[index];
      const result = await db.query(`CALL getComments(?);`, [photo.photoId]);

      photo.comments = result[0];
    }
  }

  async getFollowers() {
    try {
      const response = await db.query(`CALL getFollowers(?)`, [this.id]);

      const followerCount = response[0][0][0];
      const followerList = response[0][1];

      this.followers = followerCount;
      this.followers.list = followerList;
    } catch (error) {
      console.error(error);
    }
  }

  async getFollows() {
    try {
      const response = await db.query(`CALL getFollows(?);`, [this.id]);

      const followsCount = response[0][0][0];
      const followsList = response[0][1];

      this.follows = followsCount;
      this.follows.list = followsList;
    } catch (error) {
      console.error(error);
    }
  }
};
