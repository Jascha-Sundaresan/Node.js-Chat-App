(function() {
  if (typeof ChatApp === "undefined") {
    window.ChatApp = {};
  }

  var Chat = ChatApp.Chat = function(socket){
    this.socket = socket;
  }

  Chat.prototype.sendMessage = function(message) {
    this.socket.emit('message', { text: message });
  }

  Chat.prototype.processCommand = function(command) {
    var parsedCommand = command.split(' ');
    if (parsedCommand[0] === "nick") {
      this.socket.emit('nicknameChangeRequest', parsedCommand[1]);
    } else {
      this.socket.emit('message', { text: 'not a command' });
    }
  };

})();