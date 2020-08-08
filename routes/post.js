const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/postCtrl");
const token = require("../config/token");

router.post("/add-post", token, postCtrl.addNewPost);
router.delete("/delete-post/:postId", token, postCtrl.deletePost);

module.exports = router;
