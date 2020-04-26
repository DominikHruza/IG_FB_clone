const UserProfile = require('../models/UserProfile');

exports.getUserProfile = async (req, res) => {
  const id = req.params.userId;
  try {
    console.log('pozvao user profile api');
    //Create user profile object with id
    const userProfile = new UserProfile(id);
    // Check if user exists in db
    if (!user) {
      return res.status(400).json({ msg: 'No profile for this user' });
    }
    //Query user posts in db and send results
    const user = await userProfile.getProfile();

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
  try {
    await myProfile.getUserPhotos();
    res.json(myProfile.photos);
  } catch (err) {
    console.error(err.messsage);
    res.status(500).send('Server Error');
  }
};
