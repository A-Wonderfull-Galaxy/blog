const router = require("express").Router();
const { Post, User, Comment } = require("../models");

router.get('/', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    }

    Post.findAll({
        where: {
            user_id: req.session.user_id,
        },
        attributes: ["id", "post_text", "title", "created_at"],
        include: [
            {
                model: User,
                attributes: ["username"],
            },
            {
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["username"],
                },
            },
        ],
    })
        .then((dbPostData) => {
            const posts = dbPostData.map((post) => post.get({ plain: true }));
            const username = req.session.username
            res.render("dashboard", {
                username,
                posts,
                loggedIn: true
            });
        })
}) 

router.get("/:id", (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ["id", "post_text", "title", "created_at"],
        include: [
            {
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["username"],
                },
            },
            {
                model: User,
                attributes: ["username"],
            },
        ],
    })
        .then((dbPostData) => {
            const post = dbPostData.get({ plain: true });
            res.render("dashboard-edit", {
                post,
                loggedIn: req.session.loggedIn,
            });
        })
});


module.exports = router;