const mongoose = require("mongoose");
const User = require("./models/user");
const Author = require("./models/author");
const Genre = require("./models/genre");
const Book = require("./models/book");
const Rental = require("./models/rental");

async function main() {
	await mongoose.connect("mongodb://127.0.0.1:27017/test");
	console.log("MongoDB connected!");

	const user = new User({
		firstName: "John",
		lastName: "Doe",
		email: "example@test.com",
        phone: "1244567890"
	});

    const userForDelete = new User({
        firstName: "Test",
        lastName: "One",
        email: "example2@test.com",
        phone: "1234567890"
    });

	const genre1 = new Genre({
		name: "Science Fiction"
	});

	const genre2 = new Genre({
		name: "Fantasy"
	});

	const author1 = new Author({
		firstName: "Peter",
		lastName: "Doe"
	});

	const author2 = new Author({
		firstName: "Jane",
		lastName: "Doe"
	});

	const book1 = new Book({
		title: "Book 1",
		pageCount: 100,
		year: 2020,
		authors: [author1._id],
		genres: [genre1._id]
	});

	const book2 = new Book({
		title: "Book 2",
		pageCount: 200,
		year: 2021,
		authors: [author1._id, author2._id],
		genres: [genre1._id, genre2._id]
	});

	const rental1 = new Rental({
		user: user._id,
		book: book1._id
	});

	const rental2 = new Rental({
		user: user._id,
		book: book2._id
	});

	await user.save();
    await userForDelete.save();
	await genre1.save();
	await genre2.save();
	await author1.save();
	await author2.save();
	await book1.save();
	await book2.save();
	await rental1.save();
	await rental2.save();

	await Rental.findByIdAndUpdate(rental1._id, { returnDate: new Date() });
    await User.findOneAndDelete({ email: "example2@test.com" });

    // console log all the tables and it's data
    console.log(await User.find());
    console.log(await Genre.find());
    console.log(await Author.find());
    console.log(await Book.find());
    console.log(await Rental.find());
}
main().catch((err) => console.error(err));
