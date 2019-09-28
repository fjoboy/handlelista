const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// TODO: _remove_ from production
//const cors = require("cors");

// item schema
const Item = require('./schemas/Item');

// init app
const app = express();

// bodyParser middleware
app.use(bodyParser.json());

// TODO _remove_ from production
// app.use(cors());
// Cors middleware

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
app.get('/api/items', (req, res)=>{
    Item.find()
        .sort({date: -1})
        .then(items => res.json(items))
});

// @route   POST api/items
// @desc    add new item
// @access  Public
app.post('/api/items', (req, res)=>{
    const newItem = new Item({
        item_name : req.body.item_name
    });

    newItem.save().then(item => res.json(item));
});

// @route   DELETE api/items
// @desc    delete all items
// @access  Public
app.delete('/api/items', (req, res)=>{
    Item.remove({})
        .then(() => res.json({"msg" : "removed all items"})
        .catch(err => res.status(404).json({success : false, msg: "could note remove all items"})));
});

// @route   DELETE api/items/:id
// @desc    delete an item
// @access  Public
app.delete('/api/items/:id', (req, res)=>{
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success : true, deletedItem : item})))
        .catch(err => res.status(404).json({success : false, msg: `No item with id=${req.params.id}`}));
});

// Get port
const PORT = process.env.PORT || 5000;

// listen to port
app.listen(PORT, () => console.log(`Server started on ${PORT}`));

// Create link to Angular build directory
const distDir = __dirname + "/dist/";
app.use(express.static(distDir));