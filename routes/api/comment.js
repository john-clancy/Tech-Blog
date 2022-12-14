const router = require('express').Router();
const { comment } = require('./mods');



// Get all
router.get('/', (req, res) => {
    comment.findAll({
        attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at']
    }).then(dbCommentData=> res.json(dbCommentData))
    .catch(err => {
        console.log(err),
        res.status(500).json(err);
    });
});

// create
router.post('/', (req, res) => {
    comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    }).then (dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

// delete or "destroy"
router.delete('/:id', (req, res) => {
    comment.destroy({
        where: {
            id: req.params.id
        },
    }).then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: "No comment found with this id" });
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

module.exports = router;