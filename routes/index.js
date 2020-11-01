const router = require("express").Router()
const todosRoutes = require("./todosRoutes")
const usersRoutes = require("./usersRoutes")
const newsRoutes = require("./newsRoutes")
router.use("/news",newsRoutes)
router.use("/todos",todosRoutes)
router.use(usersRoutes)

module.exports = router