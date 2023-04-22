export const videoQueryRepo = {

    getVideos(): VideoOutputModel[] {
        const dbVideos: DBVideo[] = []
        const dbAuthors: DBAuthor[] = []

        return dbVideos.map(dbVideo => {
            const author = dbAuthors.find(a => a._id === dbVideo.authorId)

            return this._mapDBVideoToVideoOutputModel(dbVideo, author!)

        })
    },

    getVideoById(id: string): VideoOutputModel {
        const dbVideo: DBVideo = {
            _id: "2323",
            title: "dscd",
            authorId: "1111",
            banObject: null
        }
        const dbAuthor: DBAuthor = {
            _id: "1111",
            firstName: "dfd",
            lastName: "sdcds"
        }
        return this._mapDBVideoToVideoOutputModel(dbVideo, dbAuthor)
    },

    getBannedVideos(): BannedVideoOutputModel[] {
        const dbVideos: DBVideo[] = []
        const dbAuthors: DBAuthor[] = []

        return dbVideos.map(dbVideo => {
            const dbAuthor = dbAuthors.find(a => a._id === dbVideo.authorId)

            return {
                id: dbVideo._id,
                title: dbVideo.title,
                author: {
                    id: dbAuthor!._id,
                    name: dbAuthor!.firstName + "" + dbAuthor!.lastName
                },
                 banReason: dbVideo.banObject!.banReason
            }

        })
    },

    _mapDBVideoToVideoOutputModel(dbVideo: DBVideo, dbAuthor: DBAuthor) {
        return {
            id: dbVideo._id,
            title: dbVideo.title,
            author: {
                id: dbAuthor!._id,
                name: dbAuthor!.firstName + "" + dbAuthor!.lastName
            }
        }
    }

}

type VideoOutputModel = {
    id: string
    title: string
    author: {
        id: string
        name: string
    }
}

type BannedVideoOutputModel = {
    id: string
    title: string
    author: {
        id: string
        name: string
    }
    banReason: string
}

type DBVideo = {
    _id: string
    title: string
    authorId: string
    banObject: null | {
        isBanned: boolean
        banReason: string
    }
}

type DBAuthor = {
    _id: string
    firstName: string
    lastName: string
}