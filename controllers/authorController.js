const Author = require("../models/author");
const Book = require("../models/book");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");


exports.author_list = asyncHandler(async (req, res, next) => {
  const allAuthors = await Author.find().sort({ family_name: 1 }).exec();
  res.render("author_list", {
    title: "Author List",
    author_list: allAuthors,
  });
});


exports.author_detail = asyncHandler(async (req, res, next) => {
  const [author, allBooksByAuthor] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Book.find({ author: req.params.id }, "title summary").exec(),
  ]);

  if (author === null) {
    const err = new Error("Author not found");
    err.status = 404;
    return next(err);
  }

  res.render("author_detail", {
    title: "Author Detail",
    author: author,
    author_books: allBooksByAuthor,
  });
});


exports.author_create_get = (req, res, next) => {
  res.render("author_form", { title: "Create Author" });
};


exports.author_create_post = [
  body("first_name")
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage("First name must be specified")
    .isAlphanumeric()
    .withMessage("Name contains non-alpahnumeric characters"),

  body("family_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Family name must be specified.")
    .isAlphanumeric()
    .withMessage("Family name has non-alphanumeric characters."),

  body("date_of_birth", "Invalid date of birth")
    .optional({ values: "falsy" })
    .isISO8601(),

  body("date_of_death", "Invalid date of death")
    .optional({ values: "falsy" })
    .isISO8601(),
  
  asyncHandler( async(req,res,next) => {
    const errors = validationResult(req);

    const author = new Author({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death,
    });

    if(!errors.isEmpty()){
      res.render("author_form", {
        title: "Add a new Author",
        author: author,
        errors:  errors.array(),
      });
      return;
    } else{      //not checking for duplicate authors in this Form, cause we can have authors with the same
      await author.save();
      res.redirect(author.url);
    }
  }),
];

exports.author_delete_get = asyncHandler(async (req, res, next) => {
  const [ author, allBooksByAuthor ] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Book.find({author: req.params.id}, "title summary").exec()
  ]);

  if(author == null){
    res.redirect('/catalog/authors')
  }
  res.render("author_delete", {
    title: "Delete the author",
    author: author,
    author_books:  allBooksByAuthor,
  });
});

exports.author_delete_post = asyncHandler(async (req, res, next) => {
  const [author, allBooksByAuthor] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Book.find({ author: req.params.id }, "title summary").exec(),
  ]);

  if (allBooksByAuthor.length > 0) {
    res.render("author_delete", {
      title: "Delete Author",
      author: author,
      author_books: allBooksByAuthor,
    });
    return;
  } else {
    await Author.findByIdAndRemove(req.body.authorid);
    res.redirect("/catalog/authors");
  }
});


exports.author_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author update GET");
});


exports.author_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author update POST");
});
    