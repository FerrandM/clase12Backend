const express = require('express')
const cookie = require('cookie-parser')
const userRouter = require('./routes/users.router.js')
const productosRouter = require('./routes/products.router.js')
const { uploader } = require('./utils.js')
//----------------handlebars(CLASE10)----------
const handlebars = require('express-handlebars')
const routerView = require('./routes/views.router.js')

//---------------SOCKET.IO(CLASE11)------------

const { Server } = require('socket.io')

//---------------------------------------------
require('dotenv').config()
//---------------------------------------------
const app = express()
const PORT = 8080 || procces.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/virtual' ,express.static( './public'))
app.use(cookie())

//-----------------CLASE 10------------------

//handlerbars
console.log(__dirname);
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

//controlador

    // app.get('/', (req, res)=>{
    //     let context = {
    //         name: 'fede',
    //         title:'Soy el best'
    //     }
    //     console.log('funciono acá');
    //     res.render('index', context)
    // })
//estructuras



app.use('/', routerView)


//------------------------------- 4-----------

app.use('/api/usuarios', userRouter )
app.use('/api/productos', productosRouter)

app.post('/single', uploader.single('myfile'),(req, res)=>{
    res.status(200).json({
        message: 'se a subido con éxito'
    })
})

app.use((err, req,res,next)=>{
    console.log(err);
    res.status(500).send('todomal')
})

const httpServer = app.listen(PORT, err=>{
    if(err){
        console.log(err);
    }else{
        console.log(`descuchando en el puerto ola ${httpServer.address().port}`);
    }
})

const io = new Server(httpServer)
const mensajes = []


io.on('connection', socket =>{
    console.log('nuevo cliente conectado');
    socket.on('message', data =>{
        console.log(data);
        mensajes.push(data)
        io.emit('messageLog', mensajes)
    })
    
    socket.on('authenticated', data=>{
        socket.broadcast.emit('newUserConnected', data)
    })

    socket.on('disconnect', ()=>{
        console.log('Disconnected');
    })
})


 