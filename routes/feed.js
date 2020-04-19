const express = require('express');
const router = express.Router();
const token = require('../config/token');
const feedCtrl = require('../controllers/feedCtrl');

router.get('/feed', token, feedCtrl.getFeed);

module.exports = router;
