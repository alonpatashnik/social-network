const router = require('express').Router();

const { Schema, model } = require('mongoose');

// Schema to create Post model
const userSchema = new Schema(
  {
    username: {
      type: Boolean,
      default: false,
    },
    email: {
      type: Date,
      default: Date.now,
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

// Create a virtual property `tagCount` that gets the amount of comments per user
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });

// Initialize our Post model
const User = model('User', userSchema);

module.exports = User;