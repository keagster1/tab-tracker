const { Song } = require('../models')
const { Op } = require('sequelize')

module.exports = {

    async index(req, res) {
        try {
            let songs = null
            const search = req.query.search
            if (search) {
                songs = await Song.findAll({
                    where: {
                        [Op.or]: [
                            'title', 'artist', 'genre', 'album'
                        ].map(key => ({
                            [key]: {
                                [Op.like]: `%${search}%`
                            }
                        }))
                    }
                })
                res.send(songs)
            } else {
                songs = await Song.findAll({ limit: 10 })
                res.send(songs)
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: 'An error has occurred when getting songs.'
            })
        }
    },
    async post(req, res) {
        try {
            const song = await Song.create(req.body)
            res.send(song)
        } catch (error) {
            res.status(500).send({
                error: 'An error has occurred creating a song.'
            })
        }
    },
    async show(req, res) {
        try {
            const song = await Song.findByPk(req.params.songId)
            res.send(song)
        } catch (error) {
            res.status(500).send({
                error: 'An error has occurred when getting songs.'
            })
        }
    },
    async put(req, res) {
        try {
            const song = await Song.update(req.body, {
                where: {
                    id: req.params.songId
                }
            })
            res.send(this.body)
        } catch (error) {
            res.status(500).send({
                error: 'An error has occurred when getting songs.'
            })
        }
    }
}