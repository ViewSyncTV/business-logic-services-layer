class MovieNotFoundError extends Error {
    constructor(movieName) {
        super(`Movie with name "${movieName}" not found`)
        this.status = 404
        this.code = "MOVIE_NOT_FOUND"
    }
}

class TvShowNotFoundError extends Error {
    constructor(tvShowName) {
        super(`TV show with name "${tvShowName}" not found`)
        this.status = 404
        this.code = "TV_SHOW_NOT_FOUND"
    }
}

module.exports = {
    MovieNotFoundError,
    TvShowNotFoundError,
}
