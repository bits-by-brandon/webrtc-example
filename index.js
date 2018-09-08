const p2pserver = require('socket.io-p2p-server').Server;
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3001;

const path = require('path');

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/socketiop2p.min.js', function(req, res){
  res.sendFile(path.join(__dirname, 'node_modules', 'socket.io-p2p', 'socketiop2p.min.js'));
});

io.use(p2pserver);
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(PORT, function(){
  console.log(`Server listening on port ${PORT}`);
  process.send('ready');
});