const router = require('express').Router();

const { Schema, model, mongoose } = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    }
})

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 250,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
        type: String,
        required: true,
      },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `tagCount` that gets the amount of comments per user
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our Post model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;