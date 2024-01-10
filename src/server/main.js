const express = require("express"); 
const ViteExpress = require ("vite-express")

const app = express();

//middleware
app.use(express.json());

//routes
app.use('/api', require('./api/index.js'));
app.use('/auth', require('./auth/index.js'));

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
