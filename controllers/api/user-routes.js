const router = require('express').Router();
const { User } = require('../../models')

// GET /api/users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => {
            res.json(dbUserData)
        })
});

// POST /api/users
router.post('/', (req, res) => {
    // expects {username: 'user', password: 'password'}
    User.create({
        username: req.body.username,
        password: req.body.password
    })
        .then(dbUserData => res.json(dbUserData))
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: { exclude: ['password'] }
    })
});



router.post('/login', (req, res) => {
    // expects {username: 'user', password: 'password'}
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(dbUserData => {
        // this initiate the creation of the session
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'Logged in!' });
        });
    })
})

    // DELETE /api/users/1
    router.delete('/:id', (req, res) => {
        User.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user id' });
                    return;
                }
                res.json(dbUserData);
            })
    });
    // PUT /api/users/1
    router.put('/:id', (req, res) => {
        // expects {username: 'user', password: 'password'}

        User.update(req.body, {
            where: {
                id: req.params.id
            }
        })
            .then(dbUserData => {
                if (!dbUserData[0]) {
                    res.status(404).json({ message: 'No user id' });
                    return;
                }
                res.json(dbUserData);
            })
    });

    

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    }
})

    module.exports = router;