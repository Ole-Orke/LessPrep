const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const server = require("http").Server(app);
const User = require("./src/user.js").User;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const fs = require("fs");
const multer = require("multer");
const io = require("socket.io")(server);
const upload = multer({ dest: 'uploads/' });
const saltRounds = 10;
require('dotenv').config();

//Passport initialize

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log(username, password);
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      hash = user.password;
      console.log(hash);
      bcrypt.compare(password, hash)
        .then((valid) => {
          if(valid) {
            console.log("valid");
            return done(null, user);
          }
          else {
            return done(null, false);
          }
        });
    });
  }
));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'build')));

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true}, (error) => {
  if(error) {
    console.log(error)
  }
  else {
    console.log("Success, connected to MongoDB");
  }
});

app.use(bodyParser.json())

app.get('/ping', function (req, res) {
 return res.send('pong');
});

//aasd

// DO NOT REMOVE THIS LINE :)
//CHANGE TO BUILD WHEN RELEASING
app.get('/', function (req, res) {
  res.status(200).sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post("/api/user/register", (req, res) => {
  const {password, email} = req.body;
  bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
      console.log(err);
      res.json({
        error: "Could not hash password"
      });
    }
    else {
      const newUser = new User({
        email: email,
        password: hash
      });
      newUser.save()
        .then((user) => {
          if(!user){
            res.status(500).json({
              error: "Could not save user"
            });
          }
          else {
            res.status(200).json({
              success: true
          });
        }
      })
    }
  });
});

// app.post("/api/photo/upload", (req, res) => {
//   const userId = req.body.userId;
//   const imgPath = fs.readFileSync(req.body.imgPath);
//   if (userId) {
//     User.findOneAndUpdate(userId, {
//       editingImage.
//     })
//   }
//   else {
//     res.status(400).json({
//       error: "Missing userId parameter"
//     });
//   }
// });

app.post("/api/user/login",
  passport.authenticate("local"),
  (req, res) => {
    console.log(req.user);
    res.json({
      success: true
    });
  }
);

app.get("/api/user/logout", (req, res) => {
  req.logout();
  res.json({
    success: true
  });
});

io.on("connection", (socket) => {
  socket.on("ping", (data) => {
    socket.emit("pong");
  });

  app.post('/api/photo', upload.single('photo'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);
    console.log("req.user:", req.user);
    let newUser = new User({
      email: "test@test.com",
      password: "test",
      editingImage: {
        data: fs.readFileSync(req.file.path),
        contentType: "image/jpeg",
      }
    });
    newUser.save((err, user) => {
      if (err) {
        console.log("Err:", err);
      }
      console.log("Saved image to MongoDB!");
      console.log("User:", user);
    });
    socket.emit("image");
    res.status(201).send('success');
  });
});

server.listen(process.env.PORT || 1337);
