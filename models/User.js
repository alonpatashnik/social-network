const router = require('express').Router();

const { Schema, model } = require('mongoose');

// Schema to create Post model
const userSchema = new Schema(
  {
    username: {
      type: String,
      default: false,
    },
    email: {
      type: String,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


userSchema
  .virtual('friendCount')

  .get(function () {
    return this.friends.length;
  });


const User = model('User', userSchema);


module.exports = User;