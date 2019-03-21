const db = require('../models');

exports.createMessage = async function (req, res, next) {
	try {
		let message = await db.Message.create({
			text: req.body.text,
			user: req.params.id
		});
		let user = await db.User.findById(req.params.id);
		//console.log(user);
		user.messages.push(message.id);
		await user.save();
		await message.populate('user', {
			username: true,
			profileImage: true
		});
		return res.status(200).json(message);
	} catch (e) {
		next(e);
	}
};
exports.getMessage = async function (req, res, next) {
	try {
		let message = await db.Message.findById(req.params.message_id);
		return res.status(200).json(message);
	} catch (e) {
		next(e);
	}
};
exports.deleteMessage = async function (req, res, next) {
	try {
		let message = await db.Message.findById(req.params.message_id);
		await message.remove();
		return res.status(200).json(message);
	} catch (e) {
		next(e);
	}
};