const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const server = require("http").Server(app);
const User = require("./src/user.js").User;
const Table = require("./src/table.js").Table;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const fs = require("fs");
const multer = require("multer");
const btoa = require("btoa");
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
            console.log("user:", user);
            return done(null, user);
          }
          else {
            return done(null, false);
          }
        });
    });
  }
));

app.use(session({
  secret: process.env.SECRET
}));
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
      success: true,
      userId: req.user._id,
    });
  }
);

app.get("/api/user/logout", (req, res) => {
  console.log("req.user:", req.user);
  req.logout();
  res.json({
    success: true
  });
});

app.post('/api/table', function(req, res) {
  console.log(req.body);
  let newTable = new Table ({
    title: req.body.title,
    data: req.body.data
  });
  newTable.save((err, table) => {
    if (err) {
      console.log('Saving error: ', err);
    } else {
      console.log('saved table to MongoDB!');
      console.log('table set to:', table);
    }
  })
})

io.on("connection", (socket) => {
  socket.on("ping", (data) => {
    socket.emit("pong");
  });

  socket.on("join", (userId) => {
    console.log("Join request:", userId);
    socket.join(userId);
  });

  app.post('/api/photo', upload.single('photo'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body has userId
    console.log("req.file:", req.file);
    console.log("req.body:", req.body);

    const userId = req.body.userId;
    User.findByIdAndUpdate(userId, {
      editingImage: {
        data: fs.readFileSync(req.file.path),
        contentType: "image/jpeg",
      }
    },(error) => {
      if (error) {
        res.status(500).json({
          error: "Could not update editing image"
        });
      }
      else {
        console.log("Will emit image");
        io.to(userId).emit("image");
        res.status(200).json({
          success: true
        });
      }
    });
  });

  app.get("/api/photo", (req, res) => {
    if (!req.user) {
      res.status(403).json({
        error: "Unauthorized"
      });
    }
    else {
      const userId = req.user._id;
      console.log("userId:", userId);
      User.findById(userId, (error, user) => {
        if (error) {
          console.log(error);
        }
        else if (!user) {
          res.status(500).json({
            error: "Could not retrieve user"
          });
        }
        else {
          const b64encoded = btoa(new Uint8Array(user.editingImage.data).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
            }, ''));
          const datajpg = "data:image/jpg;base64," + b64encoded;
          res.status(200).json({
            success: true,
            editingImage: {
              src: datajpg,
            }
          });
        }
      });
    }
  });
});

server.listen(process.env.PORT || 1337);
