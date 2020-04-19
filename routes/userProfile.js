const express = require('express');
const router = express.Router();
const token = require('../config/token');
const userProfileCtrl = require('../controllers/userProfileCtrl');

router.get('/user/:userId', token, userProfileCtrl.getUserProfile);
router.get('/my-profile', token, userProfileCtrl.getMyProfile);
module.exports = router;
