
const { articleController, userController } = require('../controllers');

const router = require('express').Router();


router.route("/users/register")
    .post(userController.registerUser);

// Routes for a specific user based on email
router.route("/users/:email")
    .get(userController.getUserProfile) // Get profile by email
    .delete(userController.removeUser); // Delete user by email

router.route("/articles")
.get(articleController.getAllArticles)
.post(articleController.createArticle)


router.route("/articles/:id")
.get(articleController.getArticleById)
.delete(articleController.removeArticle)





module.exports = router