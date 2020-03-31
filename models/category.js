const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    }
},{ timestamps: true})
// timestamps record the time when new enrty made

module.exports = mongoose.model("Category", categorySchema);