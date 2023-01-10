const express = require('express')
const app = express()
const port = process.env.PORT || 3700

app.set('views', __dirname+'/views')
app.set('view engine', "jade")
app.engine('jade', require('jade').__express)
app.get('/', (req, res) => {
    res.render('page')
})
app.use(express.static(__dirname + '/public'))
let midPort = app.listen(port, () => console.log('Port:'+port))

let io = require('socket.io')(midPort)
io.sockets.on('connection', (socket) => {
    socket.emit('message', {message:'mensagem'})
    socket.on('send', (data) => {
        io.sockets.emit('message', data)
    })
})