const express = require('express')
const { upload } = require('../../middleware/multerConfig')
const { handleLogout, handleRegister, handleLogin, googleCallback, facebookCallback} = require('../../controllers/auth/auth.controller')
const { errorHandler } = require('../../utils/catchError/catchAsyncError')
const passport = require('passport')
const router = express.Router()

router.route("/login").post(errorHandler(handleLogin))
router.route("/register").post(upload.single('photoUrl'),errorHandler(handleRegister))
router.route("/logout").post(errorHandler(handleLogout))
module.exports = router

// Google authentication routes
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    errorHandler(googleCallback)
);

// Facebook authentication routes
router.get('/auth/facebook',
    passport.authenticate('facebook', { scope: ['email'], session: false })
);

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login', session: false }),
    errorHandler(facebookCallback)
);