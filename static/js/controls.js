
var Controls = {

  keys : {
    up : false,
    down : false,
    left : false,
    right : false
  },
  keycodes : {
    37 : 'left',
    38 : 'up',
    39 : 'right',
    40 : 'down'
  },
  keyup : function(e){
    var keyreleased = Controls.keycodes[e.keyCode];
    if(keyreleased != null){
      Controls.keys[keyreleased] = false;
    }

  },
  keydown : function(e){

    var keypressed = Controls.keycodes[e.keyCode];

    if(keypressed != null){
      Controls.keys[keypressed] = true;
    }
  }
};

document.addEventListener('keydown', Controls.keydown);

document.addEventListener('keyup', Controls.keyup );
