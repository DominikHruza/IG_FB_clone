const Post = require('../models/Feed');

exports.addNewPost = (req, res) => {
  const { description, tags } = req.body;
  console.log(description, tags);
  console.log(req.file);

  try {
    if (!req.file) {
      res.status(422).send({ msg: 'No image provided' });
    }

    const imageUrl = req.file;
    res.status(200).send(imageUrl);
  } catch (error) {}
};
