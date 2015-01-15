var guestnumber = 0;

var nicknames = {};

var newGuestName = function(io) {
  guestnumber += 1;
  var name = ('Guest' + guestnumber);
  io.emit('nicknameChangeResult', {
    success: true,
    nickname: name
  })
  return name;
};

var nameUsed = function(name) {
  for (var key in nicknames) {
    if (nicknames[key] === name) {
      return true;
    }
  }
  return false;
};

var createChat = function(server) {

  var io = require('socket.io')(server);

  io.on('connection', function (socket) {
    nicknames[socket.id] = newGuestName(io);
    socket.on('message', function (data) {
      io.emit('message', { nickname: nicknames[socket.id], text: data.text })
    });

    socket.on('nicknameChangeRequest', function(name) {
      if (name.indexOf('Guest') === 0) {
        socket.emit('nicknameChangeResult', {
          success: false,
          message: 'Names cannot begin with "Guest".'
        });
      } else if (nameUsed(name)) {
        socket.emit('nicknameChangeResult', {
          success: false,
          message: 'Name is already in use.'
        });
      } else {
        var prevName = nicknames[socket.id];
        nicknames[socket.id] = name;
        io.emit('nicknameChangeResult', {
          success: true,
          nickname: name,
          prev: prevName
        })
      }
    });
  });
};

module.exports = createChat;