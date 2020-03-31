const mongoose = require('mongoose');
const express = require('express');
const app = express();

// First connecting to the database
mongoose.connect('mongodb://localhost:27017/tshirt', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=>{
    console.log('DB CONNECTED');
})

// creating server with express
const port = 8000;
app.listen(port, ()=>{
    console.log(`App is running at ${port}`);
})

