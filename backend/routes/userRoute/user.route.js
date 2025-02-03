const express = require('express')
const router = express.Router()

router.route("/user/profile").post().patch().get()


module.exports = router