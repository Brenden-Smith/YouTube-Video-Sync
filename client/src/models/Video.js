export default class Video {
    constructor({ comments, creator, creator_photo, src, title, thumbnail }) {
        this.comments = comments;
        this.creator = creator;
        this.creator_photo = creator_photo;
        this.src = src;
        this.title = title;
        this.thumbnail = thumbnail;
    }
}