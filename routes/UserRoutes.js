const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authenticate = require('../middlewares/authMiddleware'); // 👈 Add this

const {
    ValidateUserCreation,
    ValidateUserIdParam,
    ValidateUserEmailParam,
    ValidateUserNameParam,
    ValidateUserUpdate,
} = require('../validators/userDTO');

// Route to create a new user
router.post('/', ValidateUserCreation, (req, res) =>
    UserController.createUser(req, res)
);

// Route to loginUser
router.post('/loginUser', (req, res) =>
    UserController.loginUser(req, res)
);

// Route to get all users
router.get('/', (req, res) => UserController.getAllUsers(req, res));

// Route to get user by email
router.get('/email/:email', ValidateUserEmailParam, (req, res) =>
    UserController.getUserByEmail(req, res)
);

// Route to get user by ID
router.get('/id/:id', ValidateUserIdParam, (req, res) =>
    UserController.getUserById(req, res)
);

// Route to get user by name
router.get('/name/:name', ValidateUserNameParam, (req, res) =>
    UserController.getUserByName(req, res)
);

// Route to update user by ID
router.put('/:id', [ValidateUserIdParam, ValidateUserUpdate], (req, res) =>
    UserController.updateUser(req, res)
);

// Route to delete user by ID
router.delete('/:id', ValidateUserIdParam, (req, res) =>
    UserController.deleteUser(req, res)
);

// ✅ Protected route to get current user info
router.get('/me', authenticate, async (req, res) => {
    try {
        const user = await UserController.getUserById({ params: { id: req.user.id } }, res);
 
    } catch (err) {
        res.status(500).json({ error: 'Failed to get current user' });
    }
});

module.exports = router;
