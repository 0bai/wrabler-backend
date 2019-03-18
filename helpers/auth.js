const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signIn = async function () {
	
};

exports.signUp = async function (req, res, next) {
	try {
		let user = await db.User.create(req.body);
		let {id, username, profileImage} = user;
		let token = jwt.sign({id, username, profileImage}, process.env.SECRET_KEY);
		return res.status(200).json({id, username, profileImage, token});
	} catch (e) {
		if (e.code === 11000) {
			e.message = 'Sorry, that username and/or email is taken!';
		}
		return next({status: 400, message: e.message});
	}
};