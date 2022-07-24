const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/TestNodejs')

const Schema = mongoose.Schema

const AccountSchema = new Schema({
    username: String,
    password: String,
    tasks: []
}, { collection: 'To do app'})

const AccountModel = mongoose.model('Account', AccountSchema)

module.exports = AccountModel