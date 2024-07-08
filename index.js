import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

// Middleware to parse JSON request bodies
app.use(express.json());

const PORT = process.env.PORT;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL).then(() => {
    console.log("Database is connected");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
});

const booksSchema = new mongoose.Schema({
    _id: String,
    title: String,
    author: String,
    pages: Number,
    genres: Array,
    rating: Number,
});

const BooksModel = mongoose.model("books", booksSchema);

app.get('/getbooks', async (req, res) => {
    try {
        const booksData = await BooksModel.find();
        res.json(booksData);
    } catch (error) {
        res.status(500).send('Error fetching books');
    }
});

// app.get('/getbooks/:id', async (req, res) => {
//     const bookId = req.params.id;

//     try {
//         const bookData = await BooksModel.findById(bookId);
//         if (bookData) {
//             res.json(bookData);
//         } else {
//             res.status(404).send('Book not found');
//         }
//     } catch (error) {
//         res.status(500).send('Error fetching book');
//     }
// });

// PATCH route to update book data
// app.patch('/getbooks/:id', async (req, res) => {
//     const bookId = req.params.id;
//     const updateData = req.body;

//     try {
//         const bookData = await BooksModel.findByIdAndUpdate(bookId, updateData, { new: true });
//         if (bookData) {
//             res.json(bookData);
//         } else {
//             res.status(404).send('Book not found');
//         }
//     } catch (error) {
//         console.error('Error updating book:', error); // Log the error
//         res.status(500).send('Error updating book');
//     }
// });
