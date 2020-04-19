const db = require('../config/db');
const bcrypt = require('bcryptjs');
module.exports = class userAuth {
  constructor(username, email, password, confirmedPassword) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.confirmedPassword = confirmedPassword;
  }

  async insertNewUser() {
    try {
      await db.query(
        `INSERT INTO users (username, email, pass) VALUES (?,?,?)`,
        [this.username, this.email, this.password]
      );
      return 'success';
    } catch (error) {
      return error.errno;
    }
  }

  static async checkUserExist(email) {
    try {
      const response = await db.query(
        `SELECT id, email, username, pass FROM users WHERE email = ?;`,
        [email]
      );
      //If no user with that email in db
      if (response[0] === []) return null;
      //if email found in db
      return response[0][0];
    } catch (error) {
      console.log(error);
    }
  }

  static async validatePassword(password, hashPassword) {
    try {
      const match = await bcrypt.compare(password, hashPassword);
      //If pass dont match
      if (!match) {
        return null;
      }
      return match;
    } catch (error) {
      console.log(error);
    }
  }
};
