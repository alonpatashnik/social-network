const { Thought } = require('../../models');

const router = require('express').Router();

router.get('/', (req, res) => {
    Thought.find({}, (err, result) => {
        if (result) {
            res.status(200).json(result);
            } else {
            console.log('Uh Oh, something went wrong');
            res.status(500).json({ error: 'Something went wrong' });
            }
    })
})

module.exports = router;