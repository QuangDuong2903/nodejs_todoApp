const express = require('express')

const jwt = require('jsonwebtoken')

const router = express.Router()

const AccountModel = require('../models/account')

router.get('/', (req, res) => {
    AccountModel.findOne({username: req.query.username})
    .then(data => {
        if(data)
        {
            if(data.password == req.query.password)
            {
                var token = jwt.sign({ _id: data._id }, 'qd')
                res.json({id: data._id, token: token})
            }
            else
                res.json('Sai mật khẩu')
        }
        else
            res.json('Tài khoản không tồn tại')
    })
    .catch(err => {
        res.status(500).json('Lỗi server')
    })
})

module.exports = router