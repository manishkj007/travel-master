const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const postsRouter = require('../routes/posts');
const callbackRequestsRouter = require('../routes/callback-requests');
const emailsRouter = require('../routes/emails');
const usersRouter = require('../routes/users');
const Post = require('../models/posts').Post;
const auth = require('../controllers/auth');

app.set('view engine', 'ejs');
mongodb://manishkj007:Manish123@travels-shard-00-02.3nn5z.mongodb.net:27017,travels-shard-00-00.3nn5z.mongodb.net:27017,travels-shard-00-01.3nn5z.mongodb.net:27017/travels?retryWrites=true&w=majority&ssl=true&authSource=admin&replicaSet=atlas-7yig85-shard-0


app.use(express.json());
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/images'),
    filename: (req, file, cb) => cb(null, file.originalname)
});
app.use(multer({ storage: imageStorage }).single('imageFile'));
app.use(express.static('public'));
app.use(cookieParser());

app.use('/posts', postsRouter);
app.use('/callback-requests', callbackRequestsRouter);
app.use('/emails', emailsRouter);
app.use('/users', usersRouter);


// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/index.html'));
// });

app.get('/sight', async (req, res) => {
    let id = req.query.id;
    let post = await Post.findOne({ id: id });
    res.render('sight', {
        title: post.title,
        imageUrl: post.imageUrl,
        date: post.date,
        text: post.text
    });
});

app.get('/admin', (req, res) => {
    let token = req.cookies['auth_token'];
    if (token && auth.checkToken(token)) {
        res.render('admin');
    } else {
        res.redirect('/login');
    }
});

app.get('/login', (req, res) => {
    res.render('login');
});

module.exports = app;
