const BookInstance = require("../models/bookinstance");
const Book = require("../models/book");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");


exports.bookinstance_list = asyncHandler(async (req, res, next) => {
  const allBookInstances = await BookInstance.find().populate("book").exec();

  res.render("bookInstance_list", {
    title: "Book Instance List",
    bookinstance_list: allBookInstances,
  });
});


exports.bookinstance_detail = asyncHandler(async (req, res, next) => {
  const bookinstance = await BookInstance.findById(req.params.id).populate("book").exec();

  if(bookinstance === null){
    const err = new Error("Book copy not found");
    err.status = 404;
    next(err);
  };

  res.render("instance_detail", {
    title: "Book Instance Detail",
    bookinstance: bookinstance,
  })
});


exports.bookinstance_create_get = asyncHandler(async (req, res, next) => {
  const allBooks = await Book.find({}, "title").exec();

  res.render("bookinstance_form",{
    title: "Create a bookinstance",
    book_list: allBooks,
  })
});


exports.bookinstance_create_post = [
  body("book", "Book must be specified").trim().isLength({min: 1}).escape(),

  body("imprint" ,"Imprint must be specified")
  .trim()
  .isLength({min: 1})
  .escape(),

  body("status").escape(),

  body("due_back", "Invalid date")
  .optional({values: "falsy"})
  .isISO8601(),

  asyncHandler( async(req,res,next ) => {

    const errors = validationResult(req)

    const bookInstance = new BookInstance({
      book: req.body.book,
      imprint : req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
    });

    if(!errors.isEmpty()){
      const allBooks = await Book.find({}, "title").exec();

      res.render("bookinstance_form", {
        title: "Create a bookinstance",
        book_list: allBooks,
        selected_book : BookInstance.book._id,
        errors: errors.array(),
        bookinstance: bookInstance,
      });
      return;
    } else{
      await bookInstance.save();
      res.redirect(bookInstance.url);
    }
  })
]

exports.bookinstance_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance delete GET");
});


exports.bookinstance_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance delete POST");
});


exports.bookinstance_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance update GET");
});


exports.bookinstance_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance update POST");
});
