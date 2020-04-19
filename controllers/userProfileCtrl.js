const UserProfile = require('../models/UserProfile');

exports.getUserProfile = async (req, res) => {
  const id = req.params.userId;
  try {
    //Create user profile object with id
    const userProfile = new UserProfile(id);
    //Query user posts in db and send results
    await userProfile.getUserPhotos();
    res.status(200).json(userProfile.photos);
  } catch (err) {
    console.error(err.messsage);
    res.status(500).send('Server Error');
  }
};

exports.getMyProfile = async (req, res) => {
  //Get decoded id from token
  const myId = req.user.id;
  const myProfile = new UserProfile(myId);
  await myProfile.getUserPhotos();
  res.json(myProfile.photos);
};
