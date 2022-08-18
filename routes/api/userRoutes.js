const { User } = require('../../models');
const {
    getUsers,
    getSingleUser,
    createUser,
    addFriend,
  } = require('../../controllers/userController');
const router = require('express').Router();

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser);

router.route('/:userId/friends/:friendId').post(addFriend)

module.exports = router;