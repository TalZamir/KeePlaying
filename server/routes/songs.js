const express = require('express');
const router = express.Router();
const Song = require('../models/Song');

router.get('/', async (req, res) => {
    try {
        console.log(req.query);
        const libraryType = req.query.libraryType;
        const songs = await Song.find({libraryType: libraryType}).sort({place: 1});
        res.json(songs);
    } catch (e) {
        res.json({message: e});
    }
});

router.post('/', async (req, res) => {
    try {
        const song = buildSong(req.body);
        const savedSong = await song.save();
        res.json(savedSong);
    } catch (e) {
        res.json({message: e});
    }

});

const buildSong = (reqBody) => {
    return new Song({
        id: reqBody.id,
        name: reqBody.name,
        performer: reqBody.performer,
        libraryType: reqBody.libraryType,
        place: reqBody.place,
    });
}

module.exports = router; 