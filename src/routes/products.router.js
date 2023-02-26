const { Router } = require('express')
const router = Router()

function mid1(req,res,next){
    req.dato1='dato uno'
    next()
}
function mid2(req,res,next){
    req.dato2='dato dos'
    next()
}



router.use((req, res, next)=>{
    console.log('olaas');
    setTimeout(() => {
        next()
    }, 3000);
})

router.get('/', (req, res)=>{
    res.status(200).send({
        dato1: req.dato1,
        dato2: req.dato2    
    })
})

router.post('/', (req, res)=>{
    const{name, price} = req.body
    res.status(200).send({name, price})
})

module.exports = router

//1:10 