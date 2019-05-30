const {Song} = require('../models')

module.exports = {
    async index (req, res) {
        try {
            const songs = await Song.findAll({limit: 10})
            res.send(songs)
        } catch (error) {
            res.status(500).send({
                error: 'An error has occurred when getting songs.'
            })
        }
    },
    async post (req, res) {
        try {
            const song = await Song.create(req.body)
            res.send(song)
        } catch (error) {
            res.status(500).send({
                error: 'An error has occurred creating a song.'
            })
        }
    },
    async show (req, res) {
        try {
            const song = await Song.findByPk(req.params.songId)
            res.send(song)
        } catch (error) {
            res.status(500).send({
                error: 'An error has occurred when getting songs.'
            })
        }
    }
}