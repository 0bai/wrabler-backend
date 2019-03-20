require('dotenv').load();
const jwt = require('jsonwebtoken');


exports.loginRequired = function (req, res, next) {
	try {
		const token = getToken(req);
		jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
			if (decoded) return next();
			return next(generateErrorResponse(401, 'Please login first!'));
		});
	} catch (e) {
		return next(generateErrorResponse(401, 'Please login first!'));
	}
};

exports.ensureCorrectUser = function (req, res, next) {
	try {
		const token = getToken(req);
		jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
			if (decoded && decoded.id === req.params.id) return next();
			return next(generateErrorResponse(401, "You don't have permission to do that!"));
		});
	} catch (e) {
		return next(generateErrorResponse(401, "You don't have permission to do that!"));
	}
};

function generateErrorResponse(code, message) {
	return {
		status: code,
		message: message
	};
}

function getToken(req) {
	return req.headers.authorization.split(" ")[ 1 ];
}