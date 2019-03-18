const db = require('../models');

exports.createMessage = async function (req, res, next) {
	try {
		let message = await db.Message.create({
			text: req.body.text,
			user: req.params.id
		});
		let user = db.User.findById(req.params.id);
		user.messages.push(message.id);
		await user.save();
		message.populate('user', {
			username: true,
			profileImage: true
		});
		return res.status(200).json(message);
	} catch (e) {
		next(e);
	}
};
exports.getMessage = async function (req, res, next) {
};
exports.deleteMessage = async function (req, res, next) {
};