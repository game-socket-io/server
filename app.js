const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const PORT = process.env.PORT || 3000

const users = [
  {
    username: 'Litha'
  }
]
const rooms = []
io.on('connect', function(socket){
  console.log(`Socket io client connected`);
  socket.emit('init', { users, rooms })
  socket.on('addUser', payload => {
    users.push({ username: payload })
    io.emit('CreateUser', payload)  //jalan di semua client
  })

  socket.on('addRoom', payload => {
    console.log(payload, '<<<ROOMS')
    rooms.push(payload)
    io.emit('setRoom', rooms)
  })
})
server.listen(PORT, ()=>{
  console.log('listening on port', PORT);
})