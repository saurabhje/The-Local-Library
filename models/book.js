const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "Author", required: true }, //refrence to the Author
  summary: { type: String, required: true },
  isbn: { type: String, required: true },
  genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],   //refrence to the genre
});

// Virtual for book's URL
BookSchema.virtual("url").get(function () {
  return `/catalog/book/${this._id}`;
});


module.exports = mongoose.model("Book", BookSchema);
