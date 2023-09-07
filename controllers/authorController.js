const Author = require("../models/author");
const asyncHandler = require("express-async-handler");

exports.author_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author list");
});

exports.author_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Author detail: ${req.params.id}`);
});

exports.author_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author create GET");
});

exports.author_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author create POST");
});

exports.author_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author delete GET");
});

exports.author_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author delete POST");
});

exports.author_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author update GET");
});


exports.author_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author update POST");
});
    