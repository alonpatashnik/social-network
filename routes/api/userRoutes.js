const { User } = require('../../models');
const {
    getUsers,
    getSingleUser,
    createUser,
    addFriend,
    deleteFriend,
    updateUserById
  } = require('../../controllers/userController');
const router = require('express').Router();

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).put(updateUserById);

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router;