const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const book_controller = require("../controllers/bookController");
const author_controller = require("../controllers/authorController");
const genre_controller = require("../controllers/genreController");
const book_instance_controller = require("../controllers/bookinstanceController");

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/user/login');
}

router.get("/", book_controller.index);

router.get("/book/create", ensureAuthenticated, book_controller.book_create_get);
router.post("/book/create", ensureAuthenticated, book_controller.book_create_post);
router.get("/book/:id/delete", ensureAuthenticated, book_controller.book_delete_get);
router.post("/book/:id/delete", ensureAuthenticated, book_controller.book_delete_post);
router.get("/book/:id/update", ensureAuthenticated, book_controller.book_update_get);
router.post("/book/:id/update", ensureAuthenticated, book_controller.book_update_post);

router.get("/book/:id", book_controller.book_detail);
router.get("/books", book_controller.book_list);

router.get("/author/create", ensureAuthenticated, author_controller.author_create_get);
router.post("/author/create", ensureAuthenticated, author_controller.author_create_post);
router.get("/author/:id/delete", ensureAuthenticated, author_controller.author_delete_get);
router.post("/author/:id/delete", ensureAuthenticated, author_controller.author_delete_post);
router.get("/author/:id/update", ensureAuthenticated, author_controller.author_update_get);
router.post("/author/:id/update", ensureAuthenticated, author_controller.author_update_post);

router.get("/author/:id", author_controller.author_detail);
router.get("/authors", author_controller.author_list);

router.get("/genre/create", ensureAuthenticated, genre_controller.genre_create_get);
router.post("/genre/create", ensureAuthenticated, genre_controller.genre_create_post);
router.get("/genre/:id/delete", ensureAuthenticated, genre_controller.genre_delete_get);
router.post("/genre/:id/delete", ensureAuthenticated, genre_controller.genre_delete_post);
router.get("/genre/:id/update", ensureAuthenticated, genre_controller.genre_update_get);
router.post("/genre/:id/update", ensureAuthenticated, genre_controller.genre_update_post);

router.get("/genre/:id", genre_controller.genre_detail);
router.get("/genres", genre_controller.genre_list);

router.get("/bookinstance/create", ensureAuthenticated, book_instance_controller.bookinstance_create_get);
router.post("/bookinstance/create", ensureAuthenticated, book_instance_controller.bookinstance_create_post);
router.get("/bookinstance/:id/delete", ensureAuthenticated, book_instance_controller.bookinstance_delete_get);
router.post("/bookinstance/:id/delete", ensureAuthenticated, book_instance_controller.bookinstance_delete_post);
router.get("/bookinstance/:id/update", ensureAuthenticated, book_instance_controller.bookinstance_update_get);
router.post("/bookinstance/:id/update", ensureAuthenticated, book_instance_controller.bookinstance_update_post);

router.get("/bookinstances", book_instance_controller.bookinstance_list);
router.get("bookinstance/:id", book_instance_controller.bookinstance_detail);
module.exports = router;
