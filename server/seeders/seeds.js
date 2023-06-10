const db = require('../config/connections');
const { User, Post, Message } = require('../models');
const userSeeds = require('./userSeeds.json');
const postSeeds = require('./postSeeds.json');
const messageSeeds = require('./messageSeeds.json');

db.once('open', async () => {
  try {
    // Clean the database
    await User.deleteMany({});
    await Post.deleteMany({});
    await Message.deleteMany({});

    // Bulk create users
    const users = await User.insertMany(userSeeds);

    // Bulk create posts
    const posts = await Post.insertMany(postSeeds);

    // Bulk create messages
    const messages = await Message.insertMany(messageSeeds);

    console.log('Seeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
});
