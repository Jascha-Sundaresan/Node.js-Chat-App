var createChat = function(server) {

  var io = require('socket.io')(server);

  io.on('connection', function (socket) {
    socket.on('message', function (data) {
      console.log(data);
      io.emit('message', { text: data.text })
    });
  });
};

module.exports = createChat;