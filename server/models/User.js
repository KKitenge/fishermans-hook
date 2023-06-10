const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username cannot be blank."],
    unique: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: [true, "Name cannot be blank"],
  },
  email: {
    type: String,
    required: [true, "Email cannot blank"],
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: [true, "Password cannot be blank"],
    minlength: 5,
  },
  friends: [
    {
      username: {
        type: String,
        required: true,
      },
    },
  ],
  trips: [
    {
      destination: {
        type: String,
        required: true,
      },
      time: {
        type: Date,
        required: true,
      },
    },
  ],
  posts: [
    {
      postTitle: {
        type: String,
        required: true,
      },
      postText: {
        type: String,
        required: true,
      },
      postAuthor: {
        type: String,
        required: true,
      },
    }
  ],
  // posts: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Post",
  //   },
  // ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;