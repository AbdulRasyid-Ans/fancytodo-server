const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const port = process.env.PORT
const routes = require("./routes")
const errHandler = require("./middlewares/errHandler")

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(routes)
app.use(errHandler)

app.listen(port, () => {
    console.log(`Todo app listening at http://localhost:${port}`)
})