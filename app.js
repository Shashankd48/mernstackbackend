require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');

// First connecting to the database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=>{
    console.log('DB CONNECTED');
});

// My middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// My Routes
app.use('/api', authRoutes);

// creating server with express
const port = process.env.Port || 8000;

// Starting a server
app.listen(port, ()=>{
    console.log(`App is running at ${port}`);
})

