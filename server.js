require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.POST || 3000

const ErrorHandler = require('./src/middleware/ErrorHandler')
const UsersRoute = require('./src/api/users/routes')
const RoomRoute = require('./src/api/room/routes')



app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(RoomRoute)
app.use(UsersRoute)

app.get('*', (_req, res) => {
  res.send('Backend Kamar')
})

app.use(ErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})