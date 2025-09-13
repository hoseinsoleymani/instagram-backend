const router = require("express").Router();
const articleController = require("../controllers/articleController");
const authController = require("../controllers/authController");

/**
 * @swagger
 * /api/article:
 *   post:
 *     summary: Create an Article
 *     description: Create a new article. Requires authorization.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: My First Article
 *               content:
 *                 type: string
 *                 example: This is the content of my first article.
 *     responses:
 *       200:
 *         description: Article created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: article has been created
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: failure
 *                 message:
 *                   type: string
 *                   example: Error details
 */

router.post("/", authController.verify, articleController.createArticle);

/**
 * @swagger
 * /api/article/{id}:
 *   put:
 *     summary: Update an Article
 *     description: Update an existing article. Requires authorization. Only the article owner can update it.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the article to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Article Title
 *               content:
 *                 type: string
 *                 example: This is the updated content of the article.
 *     responses:
 *       200:
 *         description: Article updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: article has been updated
 *       401:
 *         description: Unauthorized - User is not the article owner
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: failure
 *                 message:
 *                   type: string
 *                   example: you are not authorized
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: failure
 *                 message:
 *                   type: string
 *                   example: Error details
 */

router.put("/:id", authController.verify, articleController.updateArticle);

/**
 * @swagger
 * /api/article/{id}:
 *   delete:
 *     summary: Delete an Article
 *     description: Delete an existing article. Requires authorization. Only the article owner or an admin can delete it.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the article to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Article deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: article has been deleted
 *       401:
 *         description: Unauthorized - User is not the article owner or an admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: failure
 *                 message:
 *                   type: string
 *                   example: you are not authorized
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: failure
 *                 message:
 *                   type: string
 *                   example: Error details
 */

router.delete("/:id", authController.verify, articleController.deleteArticle);

/**
 * @swagger
 * /api/article/timeline:
 *   get:
 *     summary: Get User Timeline Articles
 *     description: Retrieve articles from the user's timeline, including their articles and articles from users they follow. Requires authorization.
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page number for pagination (default is 1)
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of articles to return per page (default is 1)
 *         schema:
 *           type: integer
 *           default: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Articles retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 Articles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 605c72a8c0d7d1d6b5f633c0
 *                       title:
 *                         type: string
 *                         example: My First Article
 *                       content:
 *                         type: string
 *                         example: This is the content of my first article.
 *                       user:
 *                         type: object
 *                         properties:
 *                           username:
 *                             type: string
 *                             example: john_doe
 *                           profilePicture:
 *                             type: string
 *                             example: https://example.com/profile.jpg
 *                 limit:
 *                   type: integer
 *                   example: 5
 *       401:
 *         description: Unauthorized - User is not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: failure
 *                 message:
 *                   type: string
 *                   example: You are not authorized
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: failure
 *                 message:
 *                   type: string
 *                   example: Error details
 */

router.get("/timeline", authController.verify, articleController.getTimeline);

/**
 * @swagger
 * /api/article/u/{username}:
 *   get:
 *     summary: Get Articles by Username
 *     description: Retrieve all articles created by a specific user based on their username.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the user whose articles you want to retrieve.
 *         schema:
 *           type: string
 *           example: john_doe
 *     responses:
 *       200:
 *         description: Articles retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 605c72a8c0d7d1d6b5f633c0
 *                   title:
 *                     type: string
 *                     example: My First Article
 *                   content:
 *                     type: string
 *                     example: This is the content of my first article.
 *                   createdAt:
 *                     type: string
 *                     example: 2023-10-08T12:34:56.789Z
 *                   user:
 *                     type: string
 *                     example: 605c72a8c0d7d1d6b5f633c0
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: failure
 *                 message:
 *                   type: string
 *                   example: Error details
 */

router.get("/u/:username", articleController.getArticlesUser);

/**
 * @swagger
 * /api/article/{id}:
 *   get:
 *     summary: Get Article by ID
 *     description: Retrieve a specific article by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the article you want to retrieve.
 *         schema:
 *           type: string
 *           example: 605c72a8c0d7d1d6b5f633c0
 *     responses:
 *       200:
 *         description: Article retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 605c72a8c0d7d1d6b5f633c0
 *                 title:
 *                   type: string
 *                   example: My First Article
 *                 content:
 *                   type: string
 *                   example: This is the content of my first article.
 *                 createdAt:
 *                   type: string
 *                   example: 2023-10-08T12:34:56.789Z
 *                 user:
 *                   type: string
 *                   example: 605c72a8c0d7d1d6b5f633c0
 *                 comments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 605c72a8c0d7d1d6b5f633d0
 *                       content:
 *                         type: string
 *                         example: This is a comment.
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: failure
 *                 message:
 *                   type: string
 *                   example: Error details
 */

router.get("/:id", articleController.getArticle);

/**
 * @swagger
 * /api/article/{id}/like:
 *   get:
 *     summary: Like or Unlike an Article
 *     description: Toggle the like status of an article by its ID. If the user has not liked the article, it will be liked; if already liked, it will be unliked.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the article to like or unlike.
 *         schema:
 *           type: string
 *           example: 605c72a8c0d7d1d6b5f633c0
 *     responses:
 *       200:
 *         description: Article like status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: the article has been liked
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: failure
 *                 message:
 *                   type: string
 *                   example: Error details
 */


router.get("/:id/like", authController.verify, articleController.likeUnlike);

module.exports = router;
