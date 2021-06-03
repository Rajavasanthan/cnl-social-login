const express = require('express');
const config = require('./config');
const passport = require('passport');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')

const authRouter = require('./routes/auth_route');
const userRouter = require('./routes/user_route');
const storyRouter = require('./routes/story_route');

const mongoDB = 'mongodb+srv://vasanth:vasanth7788@cluster0.wwzno.mongodb.net/sociallogin?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {
    useMongoClient: true
  });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const app = express();
app.use(passport.initialize());

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/api/authentication', authRouter);
app.use('/api/user', userRouter);
app.use('/api/story', storyRouter);
 app.get('/', (req, res) => {
        res.json({root:'running'});
    });


const port = config.get('http.port');
app.listen(process.env.PORT || port, () => {
    console.log('Server listening on port http://localhost:' + port);
});
