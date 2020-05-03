const express = require('express');
const router = express.Router();
const token = require('../config/token');
const feedCtrl = require('../controllers/feedCtrl');

router.get('/feed', token, feedCtrl.getFeedData);
router.put('/feed/add-like', token, feedCtrl.updateLikes);
router.put('/feed/delete-like', token, feedCtrl.deleteLike);
router.put('/feed/add-comment', token, feedCtrl.addComment);
router.put('/feed/delete-comment', token, feedCtrl.deleteComment);

module.exports = router;
