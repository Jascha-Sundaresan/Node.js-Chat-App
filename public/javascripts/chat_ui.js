(function() {
  if (typeof ChatApp === "undefined"){
    window.ChatApp = {};
  }

  var ChatUI = ChatApp.ChatUI = function(chat) {
    this.chat = chat;
    this.bindEvents();  
  };

  ChatUI.prototype.bindEvents = function() {
    var that = this;

    $('form').on('submit', function(event){
      event.preventDefault();
      that.chat.sendMessage($('textarea').val());
      $('textarea').val('');
    });

    this.chat.socket.on('message', function(message){
      $safeMessage = $('<div>').text(message.text); 
      $('messages').append($safeMessage);
    })
  };
  
})();