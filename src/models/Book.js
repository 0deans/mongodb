const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
	title: { type: String, required: true },
	pageCount: { type: Number, required: true },
	year: { type: Number, required: true },
	authors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Author", required: true }],
	genres: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre", required: true }]
});

module.exports = mongoose.model("Book", bookSchema);
