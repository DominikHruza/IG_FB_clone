const express = require("express");
const app = express();
const multer = require("multer");
//Route imports
const routesAuth = require("./routes/auth");
const routesFeed = require("./routes/feed");
const routesUserProfile = require("./routes/userProfile");
const routesPost = require("./routes/post");

//Uploading images mware
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Parsing application/json
app.use(express.json({ extended: false }));
//Multer file upload
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

//Routes
app.use(routesAuth);
app.use(routesFeed);
app.use(routesUserProfile);
app.use(routesPost);

//Port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
