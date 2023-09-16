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
  const bookInstance = await BookInstance.findById(req.params.id)
    .populate("book")
    .exec();

  if (bookInstance === null) {
    res.redirect("/catalog/bookinstances");
  }

  res.render("bookinstance_delete", {
    title: "Delete BookInstance",
    bookinstance: bookInstance,
  });
});


exports.bookinstance_delete_post = asyncHandler(async (req, res, next) => {
  await BookInstance.findByIdAndRemove(req.body.id);
  res.redirect("/catalog/bookinstances");
});


exports.bookinstance_update_get = asyncHandler(async (req, res, next) => {
  const [bookinstance, book] = await Promise.all([
    await BookInstance.findById(req.params.id).populate("book").exec(),
    Book.find().exec(),
  ]);

  if(bookinstance == null){
    const err = new Error("No such bookinstance");
    err.status = 404;
    next(err);
  }

  res.render("bookinstance_form", {
    title: "Update BookInstance",
    selected_book: bookinstance.book._id,
    book_list : book,
    bookinstance : bookinstance,
  });
});

exports.bookinstance_update_post = [
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

    const bookinstance = new BookInstance({
      book: req.body.book,
      imprint : req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
      _id: req.params.id,
    });

    if(!errors.isEmpty()){
      const allBooks = await Book.find({}, "title").exec();

      res.render("bookinstance_form", {
        title: "Update bookinstance",
        book_list: allBooks,
        selected_book : BookInstance.book._id,
        errors: errors.array(),
        bookinstance: bookinstance,
      });
      return;
    } else{
      await BookInstance.findByIdAndUpdate(req.params.id, bookinstance)
      res.redirect(bookinstance.url);
    }
  })
];
