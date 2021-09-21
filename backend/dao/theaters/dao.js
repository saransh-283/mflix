let theatres

class theatersDAO {
    static async injectDB(conn) {
        if (theatres) return
        try {
            theatres = await conn.db(process.env.MFLIX_NAME).collection(process.env.THEATERS)
            console.log(`connected to 'theaters'`);
        } catch (e) {
            console.error(`unable to connect to 'theatres': ${e}`);
        }
    }
}

module.exports = theatersDAO