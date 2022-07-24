const express = require('express')

const app = express()

const port = 3000

var bodyParser = require('body-parser')

var signupRouter = require('./routers/SignUp.js')

var loginRouter = require('./routers/Login.js')

var userRouter = require('./routers/User.js')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.static(path.join(__dirname, 'views')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/home.html'))
})

app.set("view engine","ejs")

app.set("views","./views")

app.use('/signup', signupRouter)

app.use('/login', loginRouter)

app.use('/user', userRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})