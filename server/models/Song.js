const mongoose = require('mongoose');

const SongSchema = mongoose.Schema({
    id: String,
    name: String,
    performer: String,
    libraryType: Number,
    place: Number
});

module.exports = mongoose.model('Songs', SongSchema);