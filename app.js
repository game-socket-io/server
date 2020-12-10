const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const PORT = process.env.PORT || 3000

io.on('connect', function(socket){
  console.log(`Socket io client connected`);
})

server.listen(PORT, ()=>{
  console.log('listening on port', PORT);
})