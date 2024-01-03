const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require('../models/user');
const asyncHandler = require("express-async-handler");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return done(null, false, { message: "User not found" });
    }
    done(null, user);
  } catch (err) {
    done(err);
  }
});
exports.setUserLocals = (req, res, next) => {
  res.locals.user = req.user;
  next();
};


exports.createUser_get = (req, res, next) => {
  res.render("user_form", { title: "Sign Up!" });
};

exports.createUser_post = asyncHandler(async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    await user.save();
    res.redirect("/user/login");
  } catch (err) {
    console.error(err);
    return next(err);
  }
});


exports.loginUser_get = (req, res, next) =>{
  res.render("user_login", { title: "Log In kid!" });
}

exports.loginUser_post = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/catalog",
    failureRedirect: "/user/login",
  })(req, res, next);
};

exports.logout_User =  (req, res, next) =>{
  req.logout((err) => {
    if(err){
      return next(err)
    }
    res.redirect("/catalog");
  });
}




