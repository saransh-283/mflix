const bcrypt = require('bcrypt')
let users

class usersDao {
    static async injectDB(conn) {
        if (users) return
        try {
            users = await conn.db(process.env.MFLIX_NAME).collection(process.env.USERS)
            console.log(`connected to 'users'`);
        } catch (e) {
            console.error(`unable to connect to ${e}`);
        }
    }

    static async getUser({
        name,
        email,
        password,
        random
    }) {
        try {
            if (random) {
                const ids = await users.distinct('_id')
                const count = ids.length
                const random = Math.floor(Math.random() * count)
                const randomId = ids[random]
                const randomUser = await users.findOne({
                    _id: randomId
                })
                return await this.getUser(randomUser)
            } else {
                let query = {}
                if (!name && !email) return {
                    message: 'incomplete'
                }
                if (name) query['name'] = name
                if (email) query['email'] = email
                let user = await users.findOne(query)
                if (user) {
                    return await bcrypt.compare(password, user.password)
                } else return {
                    message: 'incomplete'
                }
            }
        } catch (e) {
            console.error(`unable to get users: ${e}`);
            return false
        }
    }

    static async postUser({
        name,
        email,
        password
    }) {
        try {
            const userExists = await users.findOne({
                email
            })
            if (!userExists) {
                const salt = await bcrypt.genSalt(12)
                const hashedPassword = await bcrypt.hash(password, salt)
                await users.insertOne({
                    name,
                    email,
                    password: hashedPassword
                })
                return {
                    message: 'user added'
                }
            } else {
                return {
                    message: 'email exists'
                }
            }
        } catch (e) {
            console.error(`unable to add user: ${e}`);
            return {
                message: 'error'
            }
        }
    }

    static async deleteUser({
        email,
        password
    }) {
        try {
            let user = await users.findOne({
                email
            })
            let passwordMatch = await bcrypt.compare(password, user.password)
            if (passwordMatch) {
                await users.deleteOne({
                    email
                })
            }
            return passwordMatch
        } catch (e) {
            console.error(`unable to delete user: ${e}`);
            return false
        }
    }
}

module.exports = usersDao