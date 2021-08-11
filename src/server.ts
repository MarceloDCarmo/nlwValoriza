import "reflect-metadata"
import express from "express"
import { router } from "./routes"

import "./database"

const port = 3000
const app = express()

app.use(express.json())
app.use(router)

app.get("/test", (req, res) => {
    res.send("Ta funfando")
} )

app.listen(port, () => console.log(`Server is running on port ${port}`))