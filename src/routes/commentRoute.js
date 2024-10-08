const router = require("express").Router();
const authController = require("../controllers/authController");
const commentController = require("../controllers/commentController");

/**
 * @swagger
 * paths:
 *   /api/comment:
 *     post:
 *       summary: Add a comment to an article
 *       tags: 
 *         - Comment
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 articleId:
 *                   type: string
 *                   description: The ID of the article to which the comment is being added
 *                   example: "60d0fe4f5311236168a109ca"
 *                 content:
 *                   type: string
 *                   description: The content of the comment
 *                   example: "This is a great article!"
 *       responses:
 *         '200':
 *           description: Comment has been created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                     example: "success"
 *                   message:
 *                     type: string
 *                     example: "Comment has been created"
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                     example: "failure"
 *                   message:
 *                     type: string
 *                     example: "Error message here"
 *       security:
 *         - bearerAuth: [] # Assuming you have a bearer token for authentication
 */

router.post("/", authController.verify, commentController.addComment);

/**
 * @swagger
 * paths:
 *   /api/comment/{ArticleId}:
 *     get:
 *       summary: Get comments by article ID
 *       tags: 
 *         - Comment
 *       parameters:
 *         - name: ArticleId
 *           in: path
 *           required: true
 *           description: The ID of the article to retrieve comments for
 *           schema:
 *             type: string
 *             example: "60d0fe4f5311236168a109ca"
 *       responses:
 *         '200':
 *           description: Successfully retrieved comments for the article
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                     example: "success"
 *                   comments:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: The ID of the comment
 *                           example: "60d0fe4f5311236168a109cb"
 *                         content:
 *                           type: string
 *                           description: The content of the comment
 *                           example: "This is a great article!"
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                     example: "failure"
 *                   message:
 *                     type: string
 *                     example: "Error message here"
 */

router.get("/:ArticleId", commentController.getbyPostId);

module.exports = router;
