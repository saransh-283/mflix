const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId
let comments

class commentsDao {
    static async injectDB(conn) {
        if (comments) return
        try {
            comments = await conn.db(process.env.MFLIX_NAME).collection(process.env.COMMENTS)
            console.log(`connected to 'comments'`);
        } catch (e) {
            console.error(`unable to connect to 'comments': ${e}`);
        }
    }

    static async getComments(movie_id) {
        let cursor
        try {
            cursor = await comments.find({
                movie_id: ObjectId(movie_id)
            })
            return {
                comments: await cursor.toArray()
            }
        } catch (e) {
            console.error(`unable to get comments: ${e}`);
            return {
                message: 'error'
            }
        }
    }

    static async postComment({
        movie_id,
        name,
        text,
        email
    }) {
        try {
            let currentComment = {
                name,
                email,
                movie_id,
                text,
                date: new Date()
            }
            await comments.insertOne(currentComment)
            return {
                message: 'comment added'
            }
        } catch (e) {
            console.error(`unable to post comment: ${e}`);
            return {
                message: 'error'
            }
        }
    }

    static async putComment({
        comment_id,
        text
    }) {
        try {
            await comments.updateOne({
                _id: ObjectId(comment_id)
            }, {
                $set: {
                    text
                }
            })
            return {
                message: 'comment updated'
            }
        } catch (e) {
            console.error(`unable to update comment: ${e}`);
            return {
                message: 'error'
            }
        }
    }

    static async deleteComment(comment_id) {
        try {
            await comments.deleteOne({
                _id: ObjectId(comment_id)
            })
            return {
                message: 'comment deleted'
            }
        } catch (e) {
            console.error(`unable to delete comment: ${e}`);
            return {
                message: 'error'
            }
        }
    }
}

module.exports = commentsDao