(function() {
  if (typeof ChatApp === "undefined"){
    window.ChatApp = {};
  }

  var ChatUI = ChatApp.ChatUI = function(chat) {
    this.chat = chat;
    this.$messages = $('messages');
    this.$input = $('textarea');
    this.bindEvents();  
  };

  ChatUI.prototype.processInput = function() {
    var input = this.$input.val();
    if (input[0] === '/') {
      this.chat.processCommand(input.slice(1));
    } else {
      this.chat.sendMessage(input);
    }
    this.$input.val('');
  };

  ChatUI.prototype.alertName = function(data) {
    var $div = $('<div>');
    var text;
    if (data.success) {
      if (!data.prev) {
        text = (data.nickname + " joined the chat.")
      } else {
        text = (data.prev + " is now known as " + data.nickname)
      }
    } else {
      text = (data.message)
    }
    this.$messages.append($div.text(text));
  };

  ChatUI.prototype.bindEvents = function() {
    var that = this;

    $('form').on('submit', function(event){
      event.preventDefault();
      that.processInput()
    });

    this.chat.socket.on('message', function(message){
      var string = message.nickname + ": " + message.text;
      $safeMessage = $('<div>').text(string); 
      that.$messages.append($safeMessage);
    });

    this.chat.socket.on('nicknameChangeResult', function(data) {
      that.alertName(data);
    });
  };
  
})();