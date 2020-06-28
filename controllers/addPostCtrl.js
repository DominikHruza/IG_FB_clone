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
    console.error(response.data);
    res.status(500).send('Internal server error');
  }
};
