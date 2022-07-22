// Import
const express = require('express');
const { body } = require('express-validator/check');

const authController = require('../controllers/auth');

// Create router
const router = express.Router();

// Router redirect
router.post('/signup',
    [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .custom((value, { req }) => {
                return User.findOne({ email: value }).then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('E-Mail address already exists!');
                    }
                });
            })
            .normalizeEmail(),
        body('password')
            .trim()
            .isLength({ min: 5 }),
        body('name')
            .trim()
            .not()
            .isEmpty(),
        body('pseudo')
            .trim()
            .not()
            .isEmpty()
    ],
    authController.signup);

router.post('/login', authController.login);

// Export modules
module.exports = router;
