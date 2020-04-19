const express = require('express');
const app = express();
const routesAuth = require('./routes/auth');
const routesFeed = require('./routes/feed');
const routesUserProfile = require('./routes/userProfile');
// Parsing application/json
app.use(express.json({ extended: false }));

app.use(routesAuth);
app.use(routesFeed);
app.use(routesUserProfile);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
