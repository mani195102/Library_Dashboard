// models/Author.js
const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  biography: { type: String, required: true },
  birthdate: { type: Date, required: true },
  image: { type: String, required: true }
});

module.exports = mongoose.model('Author', authorSchema);
