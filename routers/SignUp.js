const express = require('express')

const router = express.Router()

const AccountModel = require('../models/account')

router.post('/', (req, res) => {
    AccountModel.findOne({username: req.body.username})
    .then(data => {
        if(data)
            res.json('Tài khoản đã tồn tại')
        else
            return AccountModel.create({username: req.body.username, password: req.body.password, tasks: []})
    })
    .then(data => {
        if(data)
            res.json({message: 'Tạo tài khoản thành công', id: data._id})
    })
    .catch(err => {
        res.status(500).send('Lỗi server')
    })
})

module.exports = router