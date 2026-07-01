const express = require("express")
const router = express.Router()

const { landing, signin, signup } = require("../controllers/signinup")

router.get("/", landing)

// add these
router.get("/signin", landing)
router.get("/signup", landing)

router.post("/signin", signin)
router.post("/signup", signup)

module.exports = router