const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});


AuthorSchema.virtual("name").get(function () {
    // To avoid errors in cases where an author does not have either a family name or first name
    // We want to make sure we handle the exception by returning an empty string for that case
    let fullname = "";
    if (this.first_name && this.family_name) {
      fullname = `${this.family_name}, ${this.first_name}`;
    }
  
    return fullname;
});

AuthorSchema.virtual("url").get(function () {
    return `catalog/author/${this._id}`
})

AuthorSchema.virtual("formattedDOB").get(function (){
  return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
});
module.exports = mongoose.model("Author", AuthorSchema);