const express = require('express')

const jwt = require('jsonwebtoken')

const cookieParser = require('cookie-parser')

const router = express.Router()

router.use(cookieParser())

const AccountModel = require('../models/account')

router.get('/:id', (req, res, next) => {
    try {
        var rs = jwt.verify(req.cookies.token, 'qd')
        if(rs)
          next()
    }
    catch (err) {
        res.redirect('/')
    }
}, (req, res) => {
    AccountModel.findById(req.params.id)
    .then(data => {
        if(data) 
            res.render('user', {name: data.username, tasks: data.tasks})
    })
    .catch(err => {
        res.status(500).send('Lỗi server')
    })
})

router.post('/:id', (req, res) => {
    AccountModel.findById(req.params.id)
    .then(data => {
        if(data)
        {
            let obj = {work: req.body.work, done: req.body.done}
            data.tasks.push(obj)
            data.save()
            res.json('Thêm thành công')
        }
    })
    .catch(err => {
        res.status(500).json('Lỗi server')
    })
})

router.put('/:id', (req, res) => {
    AccountModel.findById(req.params.id)
    .then(data => {
        let change = data.tasks, index
        if(data)
        {
            for(let i = 0; i < change.length; i++)
                if(change[i].work == req.body.work)
                {
                    if(req.body.newWork)
                        change[i].work = req.body.newWork
                    else if(req.body.done || !req.body.done)
                        change[i].done = req.body.done
                    index = i
                    break
                }
            if(req.body.delete)
                change.splice(index, 1)
            AccountModel.findByIdAndUpdate(req.params.id, {tasks: change})
            .then(account => res.json('Sửa thành công'))
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json('Lỗi server')
    })
})

module.exports = router