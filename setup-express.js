require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');

exports.setupExpressServer = () => {
  const app = express();
  const port = 3000; // Default port our app will run on

  app.use(express.static('public')); //  Set our application to use static files in the public folder
  app.use(layouts); // Set our application to use layouts, using the express-ejs-layouts package

  // Set up our applications view engine
  app.set('views', './views');
  app.set('layout', './layouts/default');
  app.set('view engine', 'ejs');

  app.listen(port, () => {
    console.log(`We're running on http://localhost:${port} 🎉`);
  });

  return app;
};
