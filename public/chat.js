// Make connection
var socket = io.connect('http://54.68.52.174:3000');
//var socket = io.connect('http://localhost:3000');

// Query DOM
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    appMsg = document.getElementById('appMsg'),
    emojiBtn = document.getElementById('emojiBtn'),
    emojiSelect = document.getElementById('emojiSelect'),
    emojiSelected = document.getElementsByTagName('span');
    //console.log(emojiSelected)
// Emit events
btn.addEventListener('click', function(e){
  if(appMsg.classList.contains('active')){
      appMsg.classList.toggle('active');
  }
  if(handle.value !== '' && message.value !== ''){
    chat();
  } else {
    appMsg.classList.toggle('active');
  }

});

window.addEventListener('keypress', function(e){
  if(appMsg.classList.contains('active')){
      appMsg.classList.toggle('active');
  }
  if(e.keyCode === 13){
    if(handle.value !== '' && message.value !== ''){
      chat();
    }
  }
})

document.addEventListener('click', function(e){
  var target = e.target;
  if(target.id !== 'emojiBtn') {
    emojiSelect.classList.remove('active');
  }
})

for (var i = 0; i < emojiSelected.length; i ++) {
  emojiSelected[i].addEventListener('click', function(e){
    var emoji = this.innerHTML;
    message.value += emoji;
  });
}

emojiBtn.addEventListener('click', function(){
  emojiSelect.classList.toggle('active');
})

var chat = function(){
  socket.emit('chat', {
      message: message.value,
      handle: handle.value
  });
  message.value = "";
}
// Listen for events
socket.on('chat', function(data){
    output.innerHTML += '<div class="chatMsg"><strong>' + data.handle + ': </strong><p>' + data.message + '</p></div>';
});
