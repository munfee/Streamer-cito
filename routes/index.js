const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = require('path')

const Comment = require('../db.js').comment;
const User= require('../db.js').user; // TODO user database

const imgDir = path.join(__dirname, '..','public', 'images');

router.get('/movielist', function (req, res, next) {
  fs.promises.readdir(imgDir)
    .then(files => {
      console.log(files);
      let movies = files.map(x => x.replace('.jpg', ''));
      console.log(movies);
      res.json({ movies });
    })
    .catch(err => err);
});

router.get('/:movie/play', function (req, res, next) {
  const range = req.headers.range;

  const videoPath = path.join(__dirname, '..', 'public', 'videos', `${req.params.movie}.mp4`);
  const videoSize = fs.statSync(videoPath).size;

  const chunk = 10 ** 6;
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + chunk, videoSize - 1);

  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(videoPath, { start, end });
  videoStream.pipe(res);
});

// let commentStore = new Map; ------- mongoose-less alternative

router.get('/:movie/comment', function (req, res, next) {
  const movie = req.params.movie;
  let getComment = async () => {
    //const payload = commentStore.get(movie) || null; ---- mongoose-less alternative
    const payload = await Comment.find({ movie }, 'username time comment').exec();
    res.json({ payload });
  }
  getComment();
});

router.post('/:movie/comment', function (req, res, next) {
  let username = req.session.username, comment = req.body.comment, time = new Date().toLocaleString();
  if (!username) res.status(401).json({ message: "Cannot comment without an username" });
  else if (comment.length < 1) res.status(401).json({ message: "invalid input" });
  else {
    let movie = req.params.movie, payload = { username, comment, time };
    //(commentStore.has(movie)) ? commentStore.get(movie).push(payload) : commentStore.set(movie, [payload]);  ---moongose-less alternative
    let postComment = async () => {
      await new Comment({ movie, time, username, comment }).save();
      res.json({ message: `new comment added at ${time}` });
    }
    postComment();
  }
});

let userStore = []; //----- mongoose-less alternative 

router.get('/username', function (req, res, next) {
  if (req.session.username) res.json({ payload: req.session.username });
  else res.json({ payload: null });
  console.log(userStore);
});

router.post('/username', function (req, res, next) {
  let username = req.body.username;
  if (userStore.some(user => user === username)) res.json({ payload: null, message: "Username already taken" });
  else {
    userStore.push(username);
    req.session.username = username;
    res.status(201).json({ payload: username, message: `Registered as ${username} for this session, happy viewing!` });
    console.log(userStore);
  }
});

router.delete('/username', function (req, res, next) {
  let username = req.body.username;
  userStore = userStore.filter(user => user !== username);
  req.session.destroy();
  res.json({ payload: null, message: `${username} deleted, see you soon !` });
  console.log(userStore);
});

const reactEntry = path.resolve(__dirname, '..', 'views', 'output', 'root.html');

router.get('/', function (req, res, next) {
  res.sendFile(reactEntry);
});

router.get('/:movie', function (req, res, next) {
  //if (files.includes(movie)) {
  //movie = movie.replace(/\s/g, '%20');
  //res.render('movie', { movie });
//   } --- template languaje (EJS) alternative 
  res.sendFile(reactEntry);
});

module.exports = router;
