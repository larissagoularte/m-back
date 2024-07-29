require('dotenv').config();

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const authRouter = require('./routes/authRoutes');
const listingsRouter = require('./routes/listingsRoutes');

require('./config/passport')(passport);


const connectDB = require('./config/db');

const app = express();
const port = process.env.PORT || 3000;
const mongoUrl = process.env.DATABASE;

connectDB();

app.use(express.json());

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false, 
    store: MongoStore.create({ mongoUrl: mongoUrl })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/', listingsRouter);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})