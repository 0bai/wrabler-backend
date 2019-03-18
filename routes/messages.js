const express = require('express');
const router = express.Router({mergeParams: true});

const {createMessage, getMessage, deleteMessage} = require('../helpers/messages');

router.route('/').post(createMessage);
router.route('/').get(getMessage);
router.route('/').delete(deleteMessage);


module.exports = router;