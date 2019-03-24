//TODO: Remove parameter in deployment
require('dotenv').config({debug: process.env.DEBUG});
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const {loginRequired, ensureCorrectUser} = require('./middleware/auth');
const db = require('./models');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const messagesRouter = require('./routes/messages');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/users/:id/messages', loginRequired, ensureCorrectUser, messagesRouter);

app.get('/api/messages', loginRequired, async function (req, res, next) {
	try {
		let messages = await db.Message.find()
			.sort({createdAt: 'desc'})
			.populate('user', {
				username: true,
				profileImage: true
			});
		return res.status(200).json(messages);
	} catch (e) {
		next(e);
	}
});

// catch 404 and forward to error handlers
app.use(function(req, res, next) {
  next(createError(404));
});

// error handlers
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
	
	
	res.status(err.status || 500).json(err.message);
});

if (module === require.main) {
  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
}
module.exports = app;
