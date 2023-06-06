const { timeStamp } = require('console');
const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    postTitle: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true,
    },
    postText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
        trim: true,
    },
    postAuthor: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timeStamp) => dateFormat(timeStamp),
    },
});

const Post = model('Post', postSchema);

module.exports = Post;