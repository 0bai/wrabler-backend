const express = require('express');
const router = express.router();
const {signUp, signIn} = require('../helpers/auth');

router.post('/signup', signUp);
router.post('/signin', signIn);

module.exports = router;