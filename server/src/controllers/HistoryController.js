const { History, Song } = require('../models')
const { Op } = require('sequelize')
const _ = require('lodash')

module.exports = {

    async index(req, res) {
        try {
            const userId = req.user.id
            console.log(userId)
            const histories = await History.findAll({
                where: {
                    UserId: userId
                },
                include: [
                    {
                        model: Song,
                        required: true
                    }
                ]
            })
                .map(history => history.toJSON()) // Combines the song and bookmark into flattened json structure
                .map(history => _.extend(
                    {},
                    history.Song,
                    history
                ))
            res.send(_.uniqBy(histories, history => history.SongId))
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: 'An error has occurred when getting songs.'
            })
        }
    },
    async post(req, res) {
        try {
            const userId = req.user.id
            const { songId } = req.body
            const history = await History.create({
                SongId: songId,
                UserId: userId
            })
            res.send(history)
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: 'An error has occurred when creating a history.'
            })
        }
    },
}