// import cors from 'cors';
// import path from 'path';
// import express from 'express'
// import session from 'express-session';
// import sessionConnect from 'connect-mongodb-session';
// import connectionDB from './db/connetionDB.js';
// import homeRouter from './src/modules/home/home.route.js'
// import userRouter from './src/modules/user/user.route.js'
// import messageRouter from './src/modules/messages/message.route.js'
// import loginRouter from './src/modules/login/login.route.js'
// import registerRouter from './src/modules/register/register.route.js'



// const app = express()


// app.use(cors());
// // app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// connectionDB()


// const MongoDBStore = sessionConnect(session);

// let store = new MongoDBStore({
//     uri: process.env.MONGO_CLOUD_URL,
//     collection: 'mySessions'
// });

// // Catch errors
// store.on('error', function (error) {
//     console.log(error);
// });
// app.use(session({
//     secret: 'This is a secret',
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
//     },
//     store,

//     resave: true,
//     saveUninitialized: true
// }));



// app.set('view engine', 'ejs');
// app.set('views', 'views');
// app.set('views', path.resolve('views'));
// app.use('/', homeRouter)
// app.use('/', userRouter)
// app.use('/', messageRouter)
// app.use('/', loginRouter)
// app.use('/', registerRouter)
// // app.use('/',(req,res,next)=>{
// //     res.status(200).json({mag:"sarahah App"})
// // })

// app.get('*', (req, res, next) => {
//     return res.status(404).json({ msg: `Invalid URL : ${req.originalUrl}` })
// })

// const PORT = process.env.PORT || 3100
// app.listen(PORT, () => {
//     console.log(`Server is running on Port ${PORT}`)
// })


import express from 'express';
import path from 'path';
import cors from 'cors';
import session from 'express-session';
import MongoDBConnStore from 'connect-mongodb-session';
// import dotenv from 'dotenv';
import connectionDB from './db/connetionDB.mjs';
import homeRouter from './src/modules/home/home.route.mjs';
import userRouter from './src/modules/user/user.route.mjs';
import messageRouter from './src/modules/messages/message.route.mjs';
import signinRouter from './src/modules/signin/signin.route.mjs';
import registerRouter from './src/modules/register/register.route.mjs';

// Load environment variables
// dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
connectionDB();

// Session store configuration
const MongoDBStore = MongoDBConnStore(session);
const store = new MongoDBStore({
    uri: process.env.MONGO_CLOUD_URL,
    collection: 'mySessions'
});

// Handle store errors
store.on('error', console.error);

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'This is a secret',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        httpOnly: true,    // Prevents client-side JS from reading the cookie
        secure: process.env.NODE_ENV === 'production', // Ensures the cookie is sent only over HTTPS
        sameSite: 'strict' // Helps prevent CSRF attacks
    },
    store,
    resave: false,
    saveUninitialized: false
}));


// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.resolve('views'));

// Routes
app.use('/', homeRouter);
app.use('/', userRouter);
app.use('/', messageRouter);
app.use('/', signinRouter);
app.use('/', registerRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ msg: `Invalid URL : ${req.originalUrl}` });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});
