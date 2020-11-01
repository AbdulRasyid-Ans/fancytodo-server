const router = require("express").Router()
const TodoController = require("../controllers/TodoController")
const Auth = require("../middlewares/Auth")

router.use(Auth.authentication)
router.get("/",TodoController.list)
router.post("/",Auth.authorAdd,TodoController.add)
router.get("/:id",TodoController.show)
router.put("/:id",Auth.authorUpdate, TodoController.updateAll)
router.patch("/:id",Auth.authorUpdate,TodoController.upStatus)
router.delete("/:id",Auth.authorUpdate,TodoController.delete)

module.exports = router