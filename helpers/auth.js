const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signIn = async function (req, res, next) {
	try {
		let user = await db.User.findOne({
			email: req.body.email
		});
		let {id, username, profileImage} = user;
		if (await user.comparePassword(req.body.password)) {
			let token = jwt.sign({id, username, profileImage}, process.env.SECRET_KEY);
			return res.status(200).json({id, username, profileImage, token});
		}
		return next({status: 400, message: 'Invalid Email/Password!'});
	} catch (e) {
		return next({status: 400, message: 'Invalid Email/Password!'});
	}
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