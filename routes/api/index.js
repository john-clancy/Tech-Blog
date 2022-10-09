
const router = require('express').Router();

const userRoutes = require('./user.js');
const postRoutes = require('./post');
const commentRoutes = require('./comment');

router.use('/users', user);
router.use('/posts', post);
router.use('/comment', comment);

module.exports = router;