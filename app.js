const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const PORT = process.env.PORT || 3000

const users = [
  {
    username: 'Litha'
  }
]
io.on('connect', function(socket){
  console.log(`Socket io client connected`);
  socket.emit('init', users)
  socket.on('addUser', (payload)=>{
    users.push({ username: payload })
    io.emit('CreateUser', payload)  //jalan di semua client
  })
})

server.listen(PORT, ()=>{
  console.log('listening on port', PORT);
})