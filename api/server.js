'use strict';
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT;
const PREFIX = process.env.API_PREFIX
const model = require("./model")
const request = require("./request")

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("DB Connection established");
}, err => {
    console.log("DB Connection Failed");
});

app.use(cors())

app.get(`/`, (req, res, next) => {
    res.status(200).send({ success: true, 'code': 200, message: "HELLO WORLD" })
})

app.get(`${PREFIX}/books`, async (req, res, next) => {
    try {
        let results = []
        if (!req.query.q) {
            results = await model.booksModel.find({})
        } else {
            results = await model.booksModel.find({ title: new RegExp(req.query.q, "i") })
            if (!results.length) {
                let data = await request.get(req.query.q)
                results = data && data.items && data.items.map(obj => ({
                    bookId: obj.id,
                    title: obj.volumeInfo.title,
                    averageRating: obj.volumeInfo.averageRating,
                    authors: obj.volumeInfo.authors,
                    description: obj.volumeInfo.description,
                    categories: obj.volumeInfo.categories,
                    publisher: obj.volumeInfo.publisher,
                    publishedDate: obj.volumeInfo.publishedDate,
                    previewLink: obj.volumeInfo.previewLink,
                    coverImage: obj.volumeInfo.imageLinks && obj.volumeInfo.imageLinks.thumbnail
                })) || []
                let ids = results.map(obj => obj.bookId)
                if (ids.length) {
                    let existBooks = await model.booksModel.find({ bookId: { $in: ids } })
                    if (existBooks.length != ids.length) {
                        existBooks = existBooks.map(obj => obj.bookId)
                        let newRecords = results.filter(obj => !existBooks.includes(obj.bookId))
                        if (newRecords.length) {
                            await model.booksModel.insertMany(newRecords)
                        }
                    }
                }
            }
        }
        res.status(200).send({ success: true, 'code': 200, data: results })
    } catch (error) {
        console.error(error)
        next(error)
    }
});

// 404 HANDLER
app.use((req, res, next) => {
    res.status(404).send({ errors: [{ success: false, 'code': 404, 'message': 'Undefined endpoint url ' + req.baseUrl }] });
})

// ERROR HANDLER
app.use((error, req, res, next) => {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.error(` API: ${fullUrl},\n Message: ${error.message}\n Trace: ${error.stack}`)
    res.status((error).code < 600 ? error.code : 500).send({ success: false, 'code': (error).code < 600 ? error.code : 500, errors: error.message || error.error })
});

app.listen(PORT, () => {
    console.log("Listening on port:", PORT);
});

