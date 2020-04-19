const Auth = require('../models/Auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.getSignUp = (req, res) => {
  res.send('User sign up');
};
exports.getUserLogin = (req, res) => {
  res.send('User login');
};

exports.postSignUp = async (req, res) => {
  // Validate user input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //If user input ok, continue with user account creation
  const { username, email, password } = req.body;

  //Encrypt password
  const hashedPass = await bcrypt.hash(password, 12);
  //Create user object
  const user = new Auth(username, email, hashedPass, null);

  try {
    //insert user in db, if duplicate entry(1062) send err to client with msg
    const userDbInsert = await user.insertNewUser();
    if (userDbInsert === 1062) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }
    res.status(201).send({ msg: 'Sign up successful' });
  } catch (error) {
    // Catch server errors
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
};

exports.postUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await Auth.checkUserExist(email);
  //If email does not exist in db
  if (!user) {
    return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
  }

  // Else continue with pass validation
  const match = await Auth.validatePassword(password, user.pass);
  if (!match) {
    return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
  }

  //Generate and send jwt token
  const payload = {
    user: {
      id: user.id,
    },
  };
  jwt.sign(
    payload,
    'mypracticejwttokengenerate',
    { expiresIn: 360000 },
    (err, token) => {
      if (err) throw err;
      res.json({ token });
    }
  );

  /* res.send('Logged in'); */
};
