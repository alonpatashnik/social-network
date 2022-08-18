const connection = require('../config/connection');
const { Thought, User } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await Thought.deleteMany({});
  await User.deleteMany({});

const users = [
    {username: 'alon', email: 'alonp714@gmail.com'},
    {username: 'sam', email: 'saml714@gmail.com'},
    {username: 'jake', email: 'jakeh714@gmail.com'},
    {username: 'dean', email: 'deanw714@gmail.com'},
]

const reactionAdd = [
    {reactionBody: 'OMG!!', username: 'alonp714'},
    {reactionBody: 'I cannot believe it', username: 'deanw714'},
    {reactionBody: 'Oh my heavens', username: 'saml714'},
    {reactionBody: 'what in the heck is going on?', username: 'jakeh714'},
]

const thoughts = [
    {thoughtText: 'I have a lot of weird thoughts', username: 'alonp714', reactions: [reactionAdd[0], reactionAdd[1]]},
    {thoughtText: 'I have some weird thoughts', username: 'saml714', reactions: [reactionAdd[2], reactionAdd[1]]},
    {thoughtText: 'I have just a few weird thoughts', username: 'jakeh714', reactions: [reactionAdd[3], reactionAdd[3]]},
    {thoughtText: 'I have many, many weird thoughts', username: 'deanw714', reactions: [reactionAdd[0], reactionAdd[2]]},
]

  await User.collection.insertMany(users);
  console.log(users);
  await Thought.collection.insertMany(thoughts);
  console.log(thoughts);
  process.exit(0);
});