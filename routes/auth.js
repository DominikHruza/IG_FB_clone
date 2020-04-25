const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authCtrl');
const { check } = require('express-validator');
const token = require('../config/token');

/* router.get('/sign-up', authCtrl.getSignUp);
router.get('/login', authCtrl.getUserLogin);
 */
// POST
// user sign up
router.post(
  '/sign-up',
  [
    check('username', 'Name is required').not().isEmpty(),
    check('email', 'Enter valid email').isEmail(),
    check('password', 'Enter password with 6 or more characters').isLength({
      min: 6,
    }),
  ],
  authCtrl.postSignUp
);
router.get('/get-user', token, authCtrl.getUser);
// user login
router.post('/login', authCtrl.postUserLogin);
module.exports = router;
