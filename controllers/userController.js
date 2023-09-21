const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require('../models/user')
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
  

exports.createUser = asyncHandler(async (req, res, next) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
      });
  
      const result = await user.save();
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  });
  
exports.loginUser = asyncHandler( async (req,res, next ) => {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/"
    })
});