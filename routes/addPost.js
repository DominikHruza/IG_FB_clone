const express = require('express');
const router = express.Router();
const addPostCtrl = require('../controllers/addPostCtrl');
const token = require('../config/token');
router.post('/add-post', token, addPostCtrl.addNewPost);

module.exports = router;
