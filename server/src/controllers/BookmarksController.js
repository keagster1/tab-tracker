const { Bookmark } = require('../models')
const { Op } = require('sequelize')

module.exports = {

    async index(req, res) {
        try {
            const { songId, userId } = req.query
            const bookmark = await Bookmark.findOne({
                where: {
                    SongId: songId,
                    UserId: userId
                }
            })
            res.send(bookmark)
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: 'An error has occurred when getting songs.'
            })
        }
    },
    async post(req, res) {
        try {
            const { songId, userId } = req.body
            const bookmark = await Bookmark.findOne(
                {
                    where: {
                        SongId: songId,
                        UserId: userId
                    }
                })
            if(bookmark) {
                return res.status(400).send({
                    error: "Stop! You violated the law."
                })
            }
            const newBookmark = await Bookmark.create({
                SongId: songId,
                UserId: userId
            })
            res.send(newBookmark)
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: 'An error has occurred when creating a bookmark.'
            })
        }
    },
    async delete(req, res) {
        try {
            const { bookmarkId } = req.params
            const bookmark = await Bookmark.findByPk(bookmarkId)
            await bookmark.destroy()
            res.send(bookmark)
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: 'An error has occurred when deleting bookmark.'
            })
        }
    }
}