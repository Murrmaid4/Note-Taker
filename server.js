// bring in express
const express = require("express");
// create an instance of express and define a port 
const app = express();
const PORT = process.env.PORT || 3000;
// process.env locates the heroku server environment variable is what env stands for 

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public')); // makes client side public in browser - important 

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

app.listen(PORT, () => console.log(`Listening on PORT: http://localhost:${PORT}`));



//will need routes for index and notes, on seperate file 