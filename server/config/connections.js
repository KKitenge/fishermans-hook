const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://UCBootCamp:Jay6983nee@cluster0.jjz2xsd.mongodb.net/?retryWrites=true&w=majority');
module.exports = mongoose.connection;