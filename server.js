const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

//connect to MongoDB
mongoose.connect('mongodb+srv://admin:d@nhph@n141204@danhphan.kjnld.gcp.mongodb.net/server?retryWrites=true&w=majority', {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
var db = mongoose.connection;

//handle mongo error
db.on('error', console.log);
db.once('open', function () {
  console.log("Connected to the database!!!!");
});

//use sessions for tracking logins
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db
    })
}));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from template
app.use(express.static(__dirname + '/views'));

app.use(express.urlencoded({extended: true}));

// include routes
const initRoutes = require('./routes/routes');
initRoutes(app);

const port = 8080
app.listen(port, () => {
    console.log(`I'm running at localhost:${port}/`);
})