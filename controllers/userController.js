const User = require("../model/User");
const jwt = require("jsonwebtoken");
const { response } = require("express");

const tokenLasts = "365d";

exports.apiGetPostsByUsername = async function (req, res) {
  try {
    let authorDoc = await User.findByUsername(req.params.username);
    let posts = await Post.findByAuthorId(authorDoc._id);
    res.json(posts);
  } catch (e) {
    res.status(500).send("Sorry, invalid user requested.");
  }
};

exports.checkToken = function (req, res) {
  try {
    req.apiUser = jwt.verify(req.body.token, process.env.JWTSECRET);
    res.json(true);
  } catch (e) {
    res.json(false);
  }
};

exports.apiMustBeLoggedIn = function (req, res, next) {
  try {
    req.apiUser = jwt.verify(req.body.token, process.env.JWTSECRET);
    next();
  } catch (e) {
    res.status(500).send("Sorry, you must provide a valid token.");
  }
};

exports.doesUsernameExist = function (req, res) {
  User.findByUsername(req.body.username.toLowerCase())
    .then(function () {
      res.json(true);
    })
    .catch(function (e) {
      res.json(false);
    });
};

exports.apiLogin = function (req, res) {
  let user = new User(req.body);
  user
    .login()
    .then(function (result) {
      res.json({
        token: jwt.sign(
          {
            _id: user.data._id,
            username: user.data.username,
          },
          process.env.CRET,
          { expiresIn: tokenLasts }
        ),
        username: user.data.username,
      });
    })
    .catch(function (e) {
      res.json(false);
    });
};

exports.apiRegister = function (req, res) {
  let user = new User(req.body);
  user
    .register()
    .then(() => {
      res.json({
        token: jwt.sign(
          {
            _id: user.data._id,
            username: user.data.username,
          },
          process.env.JWTSECRET,
          { expiresIn: tokenLasts }
        ),
        username: user.data.username,
      });
    })
    .catch((regErrors) => {
      res.status(500).send(regErrors);
    });
};

exports.checkToken = function (req, res) {
  try {
    req.apiUser = jwt.verify(req.body.token, process.env.JWTSECRET);
    res.json(true);
  } catch (e) {
    res.json(false);
  }
};

exports.apiMustBeLoggedIn = function (req, res, next) {
  try {
    req.apiUser = jwt.verify(req.body.token, process.env.JWTSECRET);
    next();
  } catch (e) {
    res.status(500).send("Sorry, you must provide a valid token.");
  }
};

exports.doesUsernameExist = function (req, res) {
  User.findByUsername(req.body.username.toLowerCase())
    .then(function () {
      res.json(true);
    })
    .catch(function (e) {
      res.json(false);
    });
};

exports.displayUsers = function (req, res) {
  User.displayuser()
    .then(function (response) {
      res.json(response);
    })
    .catch((regErrors) => {
      res.status(500).send(regErrors);
    });
};
