let movies

class moviesDao {
    static async injectDB(conn) {
        if (movies) return
        try {
            movies = await conn.db(process.env.MFLIX_NAME).collection(process.env.MOVIES)
            console.log(`connected to 'movies'`);
        } catch (e) {
            console.error(`unable to connect to 'movies': ${e}`);
        }
    }

    static async getMovies({
        filters = null,
        page = 0,
        moviesPerPage = 20
    }) {
        let query
        if (filters) {
            query = {}
            if ('title' in filters) {
                query['$text'] = {
                    $search: filters['title']
                }
            }
            if ('genres' in filters) {
                query['genres'] = {
                    $all: filters['genres'].split(',') //genres should be exectly named
                }
            }
            if ('cast' in filters) {
                query['cast'] = {
                    $all: filters['cast'].split(',')
                }
            }
            if ('year' in filters) {
                query['year'] = {
                    $in: filters['year'].split(',').map(year => parseInt(year)) //genres should be exectly named
                }
            }
            if ('rated' in filters) {
                query['rated'] = {
                    $in: filters['rated'].split(',') //genres should be exectly named
                }
            }
        }

        let cursor
        try {
            cursor = await movies.find(query)
        } catch {
            console.error(`unable to get movies: ${e}`);
        }

        cursor = cursor.limit(moviesPerPage).skip(moviesPerPage * page)

        try {
            const moviesList = await cursor.toArray()
            return {
                moviesList
            }
        } catch (e) {
            console.error(`unable to convert movies array: ${e}`);
            return {
                moviesList: []
            }
        }
    }
}

module.exports = moviesDao