const { Bookmark, Song } = require('../models')
const { Op } = require('sequelize')
const _ = require('lodash')
module.exports = {

    async index(req, res) {
        try {
            const userId = req.user.id
            const { songId } = req.query
            const where = {
                UserId: userId
            }
            if (songId) {
                where.SongId = songId
            }

            const bookmarks = await Bookmark.findAll({
                where: where,
                include: [
                    {
                        model: Song
                    }
                ]
            })
                .map(bookmark => bookmark.toJSON()) // Combines the song and bookmark into flattened json structure
                .map(bookmark => _.extend(
                    {},
                    bookmark.Song,
                    bookmark
                ))
            res.send(bookmarks)
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
            const bookmark = await Bookmark.findOne(
                {
                    where: {
                        SongId: songId,
                        UserId: userId
                    }
                })
            if (bookmark) {
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
            const userId = req.user.id
            const { bookmarkId } = req.params
            const bookmark = await Bookmark.findOne({
                where: {
                    id: bookmarkId,
                    UserId: userId
                }
            })
            if (!bookmark) {
                return res.status(403).send({
                    error: "You don't have access to this bookmark"
                })
            }
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