const router= require('express').Router();
const { user, post, vote, comment }= require('./mods');


// get all 
router.get('/', (req, res) => {
    user.findAll({
        // attributes: { exclude: ['password'] }
    })
    .then(dbUserData=> res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get one user
router.get('/:id', (req, res) => {
    user.findOne({
        attributes: { exclude: ['password'] },
        include: [
            {
                model: post,
                attributes: ['id','title', 'post_url', 'created_at']
            },
            {
                model: comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: post,
                    attributes: ['title']
                }
            },
            {
                model: post,
                attributes: ['title'],
                through: vote,
                as: 'voted_posts'
            }
        ],
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: "No user found with this id" });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create
router.post('/', (req, res) => {
    user.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
    user.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: "No user with that email address" });
            return;
        }
        const validPassword= dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password' });
            return;
        }
        res.json({ user: dbUserData, message: "You're now logged in" });
    });
});

router.put('/:id', (req, res) => {
    user.update(req.body, {
        individualHooks: true,
        where: {
        id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: "No user found with this id" });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// delete or destroy
router.delete('/:id', (req, res) => {
    user.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: "No user found with this id" });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;