
const express = require('express');
// const { getDisplayRooms } = require('../controllers/authController.js');
const { displayRooms, getDeletedRoom } = require('../controllers/cardController.js');

const router = express.Router();

router.route('/displayRooms').get(displayRooms);

// router.route('display/delete/:id').get(getDeletedRoom);

module.exports = router;
