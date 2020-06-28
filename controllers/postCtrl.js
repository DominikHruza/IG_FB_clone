const Post = require('../models/Feed');
const { response } = require('express');

exports.addNewPost = async (req, res) => {
  const { description, tags, userId } = req.body;

  try {
    if (!req.file) {
      res.status(422).send({ msg: 'No image provided' });
    }
    const imageUrl = req.file.path;
    const createPost = new Post(null, userId, null);
    const result = await createPost.saveToDb(imageUrl, description);

    res.status(200).json({ msg: 'Saved', id: result });
  } catch (error) {
    res.status(500).send('Internal server error');
  }
};

exports.deletePost = async (req, res) => {
  const postId = parseInt(req.params.id);
  try {
    const response = await Post.removeFromDb(postId);
    res.status(200).send({ msg: 'Deleted' });
  } catch (error) {
    res.status(500).send('Internal server error');
  }
};
