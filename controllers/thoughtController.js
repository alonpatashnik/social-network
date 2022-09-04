const { Thought, User } = require('../models');


module.exports = {
    getThoughts(req, res) {
      Thought.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          // .select('-__v')
          .populate('reactions')
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        Thought.create(req.body)
          .then((thoughtData) => {

            // I struggled a lot with getting the thought to be added to the user
            User.updateOne({username: thoughtData.username}, {
                $push: {thoughts: thoughtData._id}
            })
            // User.findOneAndUpdate({username: req.body.username}, {
            //     $push: {thoughts: thoughtData._id}
            // })
            res.json(thoughtData)
        })
        
          .catch((err) => res.status(500).json(err));
      },

      updateThought(req, res) {
        Thought.updateOne({_id: req.params.thoughtId}, {
            thoughtText: req.body.thoughtText
        })
          .then((users) => res.json(users))
          .catch((err) => res.status(500).json(err));
      },

      deleteThought(req, res) {
        Thought.deleteOne({_id: req.params.thoughtId})
          .then((users) => res.json(users))
          .catch((err) => res.status(500).json(err));
      },

      addReaction(req, res) {
        Thought.updateOne({_id: req.params.thoughtId}, {
            $push: {reactions: req.body}
        }).then((data) => res.json(data))
      },
      
      deleteReaction(req, res) {
        Thought.updateOne({_id: req.params.thoughtId}, {
            $pull: {reactions: {_id: req.params.reactionId}}
        })
          .then((users) => res.json(users))
          .catch((err) => res.status(500).json(err));
      },

}