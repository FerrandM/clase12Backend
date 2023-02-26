const { Router } = require('express')

const routerView = Router()

const fakeapi = [
    {name:'producto 0', price:400},
    {name:'producto 1', price:350},
    {name:'producto 2', price:300},
    {name:'producto 3', price:200},
    {name:'producto 4', price:150}
]


routerView.get('/', (req, res)=>{
    let user = {
        name:'ignacio',
        lastName: 'Ferrand',
        role:'admin'
    }
    res.render('index', {
        user: user,
        isAdmin: user.role === 'admin',
        fakeapi,
        style: 'index.css'
    })
})

routerView.get('/register', (req, res)=>{
    res.render('register')
})

module.exports = routerView