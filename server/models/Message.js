const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const messageSchema = new Schema({
    messageText: {
        type: String,
        trim: true,
    },
    messageAuthor: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
});

const Message = model ('Message', messageSchema);

module.exports = Message;