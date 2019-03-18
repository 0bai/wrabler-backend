const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	profileImage: {
		type: String
	}
});

userSchema.pre('save', async function (next) {
	try {
		if (!this.isModified('password')) {
			return next;
		}
		this.password = await bcrypt.hash(this.password, 10);
		return next();
	} catch (e) {
		return next(e);
	}
});

userSchema.methods.comparePassword = async function (candidatePassword, next) {
	try {
		return await bcrypt.compare(candidatePassword, this.password);
	} catch (e) {
		next(e);
	}
};

const user = mongoose.model('User', userSchema);

module.exports = user;