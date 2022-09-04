const { User } = require('../../models');
const {
    getUsers,
    getSingleUser,
    createUser,
    addFriend,
    deleteFriend,
    updateUserById,
    deleteUserById
  } = require('../../controllers/userController');
const router = require('express').Router();

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).put(updateUserById).delete(deleteUserById);

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router;