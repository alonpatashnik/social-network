const User = require('../models/User');

module.exports = {
    getUsers(req, res) {
      User.find().populate('thoughts')
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
      User.findOne({ _id: req.params.userId })
        // .select('-__v')
        .populate('thoughts')
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // create a new user
    createUser(req, res) {
      User.create(req.body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(500).json(err));
    },

    addFriend(req, res) {
        User.updateOne({_id: req.params.userId}, {
            $push: {friends: req.params.friendId}
        }).then((data) => res.json(data))
    },

    deleteFriend(req, res) {
        User.updateOne({_id: req.params.userId}, {
            $pull: {friends: req.params.friendId}
        }).then((data) => res.json(data))
    },

    updateUserById(req, res) {
        User.updateOne({_id: req.params.userId}, {
            username: req.body.username
        }).then((data) => res.json(data))
    },

    deleteUserById(req, res) {
        User.deleteOne({_id: req.params.userId}).then((data) => res.json(data))
    },


}