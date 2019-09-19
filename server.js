const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// item schema
//const Item = require('/schemas/Item');

// init app
const app = express();

// bodyParser middleware
app.use(bodyParser.json());

// mLab uri
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/items";

// Connect to remote mongoDb
mongoose
    .connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// @route   GET api/items
// @desc    get all items
// @access  Public
router.get('/api/items', (req, res)=>{
    /**Item.find()
        .sort({date: -1})
        .then(ideas => res.json(ideas)) **/
    res.json({msg : "working response"});
});

// Get port
const PORT = process.env.PORT || 5000;

// listen to port
app.listen(PORT, () => console.log(`Server started on ${PORT}`));