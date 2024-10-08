const router = require("express").Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Signup User
 *     description: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: StrongPassword123
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *     responses:
 *       200:
 *         description: User Created Successfully
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
 *                   example: user saved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: string
 *                       example: johndoe
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

router.post("/signup", authController.signup);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login User
 *     description: Authenticate user and return access and refresh tokens
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: StrongPassword123
 *     responses:
 *       200:
 *         description: Logged in Successfully
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
 *                   example: logged in successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: johndoe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 refreshToken:
 *                   type: string
 *                   example: "dGhlIHJlZnJlc2ggdG9rZW4gdGV4dA..."
 *       401:
 *         description: Unauthorized - Invalid credentials
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
 *                   example: user does not exist or password is incorrect
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
router.post("/login", authController.login);
/**
 * @swagger
 * /api/user/logout:
 *   post:
 *     summary: Logout User
 *     description: Invalidate the user's refresh token to log them out
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "dGhlIHJlZnJlc2ggdG9rZW4gdGV4dA..."
 *     responses:
 *       200:
 *         description: Successfully logged out
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
 *                   example: You've been logged out
 *       400:
 *         description: Bad Request - Refresh token not provided
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
 *                   example: logout error
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

router.post("/logout", authController.logout);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login User
 *     description: login a new user on your Instagram-like platform
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: StrongPassword123
 *     responses:
 *       200:
 *         description: User Login Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *       400:
 *         description: Bad Request - Invalid input
 *       500:
 *         description: Server Error
 
 */
router.post("/refresh", authController.refresh);

/**
 * @swagger
 * /api/user/searchUser:
 *   get:
 *     summary: Search Users
 *     description: Retrieve a list of users based on a search query
 *     parameters:
 *       - name: search
 *         in: query
 *         description: The username to search for
 *         required: false
 *         schema:
 *           type: string
 *           example: johndoe
 *       - name: limit
 *         in: query
 *         description: The maximum number of users to return
 *         required: false
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 totalUsers:
 *                   type: integer
 *                   example: 3
 *                 limit:
 *                   type: integer
 *                   example: 5
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60f7b5cfe45d6b1d3c4f9e1a"
 *                       username:
 *                         type: string
 *                         example: johndoe
 *                       profilePicture:
 *                         type: string
 *                         example: "https://example.com/profile/johndoe.jpg"
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
router.get("/searchUser", userController.searchUsers);

/**
 * @swagger
 * /api/user/u/{username}:
 *   get:
 *     summary: Get User By Username
 *     description: Retrieve user information by their username
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: The username of the user to retrieve
 *         schema:
 *           type: string
 *           example: johndoe
 *     responses:
 *       200:
 *         description: User information retrieved successfully
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
 *                   example: user info
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60f7b5cfe45d6b1d3c4f9e1a"
 *                     username:
 *                       type: string
 *                       example: johndoe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     profilePicture:
 *                       type: string
 *                       example: "https://example.com/profile/johndoe.jpg"
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
 *                   example: user does not exist or Error details
 */
router.get("/u/:username", userController.getUserByUsername);
/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get User By ID
 *     description: Retrieve user information by their ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to retrieve
 *         schema:
 *           type: string
 *           example: "60f7b5cfe45d6b1d3c4f9e1a"
 *     responses:
 *       200:
 *         description: User information retrieved successfully
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
 *                   example: user info
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60f7b5cfe45d6b1d3c4f9e1a"
 *                     username:
 *                       type: string
 *                       example: johndoe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     profilePicture:
 *                       type: string
 *                       example: "https://example.com/profile/johndoe.jpg"
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
 *                   example: user does not exist or Error details
 */

router.get("/:id", userController.getUser);


/**
 * @swagger
 * /api/user/followings/{username}:
 *   get:
 *     summary: Get User Followings
 *     description: Retrieve the list of users that the specified user is following
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: The username of the user whose followings to retrieve
 *         schema:
 *           type: string
 *           example: johndoe
 *     responses:
 *       200:
 *         description: Followings retrieved successfully
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
 *                   example: user info
 *                 followings:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60f7b5cfe45d6b1d3c4f9e1a"
 *                       username:
 *                         type: string
 *                         example: johndoe
 *                       profilePicture:
 *                         type: string
 *                         example: "https://example.com/profile/johndoe.jpg"
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
 *                   example: user does not exist or Error details
 */
router.get("/followings/:username", userController.getFollowings);

/**
 * @swagger
 * /api/user/followers/{username}:
 *   get:
 *     summary: Get User Followers
 *     description: Retrieve the list of users who are following the specified user
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: The username of the user whose followers to retrieve
 *         schema:
 *           type: string
 *           example: johndoe
 *     responses:
 *       200:
 *         description: Followers retrieved successfully
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
 *                   example: user info
 *                 data:
 *                   type: object
 *                   properties:
 *                     followings:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "60f7b5cfe45d6b1d3c4f9e1a"
 *                           username:
 *                             type: string
 *                             example: johndoe
 *                           profilePicture:
 *                             type: string
 *                             example: "https://example.com/profile/johndoe.jpg"
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
 *                   example: user does not exist or Error details
 */

router.get("/followers/:username", userController.getFollowers);

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Update User Information
 *     description: Update the details of a user by their ID. Requires authorization.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to update
 *         schema:
 *           type: string
 *           example: "60f7b5cfe45d6b1d3c4f9e1a"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: NewStrongPassword123
 *     responses:
 *       200:
 *         description: User updated successfully
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
 *                   example: Account has been updated successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60f7b5cfe45d6b1d3c4f9e1a"
 *                     username:
 *                       type: string
 *                       example: johndoe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     profilePicture:
 *                       type: string
 *                       example: "https://example.com/profile/johndoe.jpg"
 *       400:
 *         description: Bad Request - Invalid input or user not authorized to update
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
 *                   example: you can't update this account.
 *       403:
 *         description: Forbidden - User not authorized
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
 *                   example: something is wrong ! or Error details
 */

router.put("/:id", authController.verify, userController.updateUser);

/**
 * @swagger
 * /api/user/{username}/follow:
 *   put:
 *     summary: Follow a User
 *     description: Follow a user by their username. Requires authorization.
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: The username of the user to follow
 *         schema:
 *           type: string
 *           example: johndoe
 *     responses:
 *       200:
 *         description: User followed successfully
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
 *                   example: user has been followed
 *       400:
 *         description: Bad Request - User already followed or trying to follow self
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
 *                   example: you allready follow this user or you can't follow yourself
 *       404:
 *         description: User Not Found
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
 *                   example: user does not exist
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
 *                   example: something is wrong ! or Error details
 */
router.put(
  "/:username/follow",
  authController.verify,
  userController.followUser
);

/**
 * @swagger
 * /api/user/{username}/unfollow:
 *   put:
 *     summary: Unfollow a User
 *     description: Unfollow a user by their username. Requires authorization.
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: The username of the user to unfollow
 *         schema:
 *           type: string
 *           example: johndoe
 *     responses:
 *       200:
 *         description: User unfollowed successfully
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
 *                   example: user has been unfollowed
 *       400:
 *         description: Bad Request - User not being followed or trying to unfollow self
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
 *                   example: you don't follow this user or you can't unfollow yourself
 *       404:
 *         description: User Not Found
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
 *                   example: user does not exist
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
 *                   example: something is wrong ! or Error details
 */

router.put(
  "/:username/unfollow",
  authController.verify,
  userController.unfollowUser
);

module.exports = router;
