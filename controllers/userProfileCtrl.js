const UserProfile = require('../models/UserProfile');

exports.getUserProfile = async (req, res) => {
  const id = req.params.userId;
  try {
    //Create user profile object with id
    const userProfile = new UserProfile(id);
    console.log(userProfile);
    //Query user posts in db and send results
    const user = await userProfile.getProfile();
    // Check if user exists in db
    if (!user) {
      return res.status(400).json({ msg: 'No profile for this user' });
    }

    // Build profile response from db
    await userProfile.getUserPhotos();
    await userProfile.getFollowers();
    await userProfile.getFollows();
    await userProfile.getComments();

    res.status(200).json(userProfile);
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
