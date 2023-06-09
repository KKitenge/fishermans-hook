const db = require('../config/connections');
const { User, Post, Message } = require('../models');

const userData = require('../seeders/userSeeds.json');
const postData = require('../seeders/postSeeds.json');
const messageData = require('../seeders/messageSeeds.json');

db.once('open', async () => {
    //clean database
    await User.deleteMany({});
    await Post.deleteMany({});
    await Message.deleteMany({});

     // bulk create each model
     const users = await User.insertMany(userData);
     const posts = await Post.insertMany(postData);
     const messages = await Message.insertMany(messageData);

     console.log('Seeding completed successfully.');
     process.exit(0);
});