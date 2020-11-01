const router = require("express").Router()
const NewsController = require("../controllers/NewsController")
const Auth = require("../middlewares/Auth")

router.use(Auth.authentication)
router.get("/",NewsController.getNews)

module.exports = router