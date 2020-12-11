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
// nanti hasilnya kurang lebih kek gini --> [ { name: 'litha-room', maxPlayer: '2', admin: 'litha', users: [] } ]

io.on('connect', function(socket){
  console.log(`Socket io client connected`);
  socket.emit('init', { users, rooms })
  socket.on('addUser', payload => {
    users.push({ username: payload })
    io.emit('CreateUser', payload)  //jalan di semua client
  })

  socket.on('addRoom', payload => {
    console.log(payload, '<<<ROOMS')
    rooms.push({
      name: payload.name,
      maxPlayer: payload.countPlayer,
      admin: payload.admin,
      users: []
    })
    console.log(rooms)
    io.emit('setRoom', rooms)
  })
  socket.on('join-room', payload => {
    socket.join(payload.roomName, function(){
      // console.log(socket.rooms, '<<<rooms');
      let roomIndex = rooms.findIndex((i) => i.name == payload.roomName)
      rooms[roomIndex].users.push(payload.username)
      // console.log(rooms);
      io.sockets.in(payload.roomName).emit('roomDetail', rooms[roomIndex])
    })
  })
})
server.listen(PORT, ()=>{
  console.log('listening on port', PORT);
})