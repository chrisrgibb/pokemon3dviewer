var pipeline;
var imageArray = [],
  scene,
  camera,
  renderer,
  imageLoader,
  gameWorld,
  player;

function init(){
  var level = 1;

  var loader = new THREE.XHRLoader();

  loader.load('/leveldata/'+ level, function(blob){

    return new Promise(function(fulfill, reject){
      var data = JSON.parse(blob);

      pipeline = new ImagePipeline(data);
      pipeline.createTileSheet(1);

      pipeline.mapTextures().then(function(textureArray){

        gameWorld = new GameWorld(data);

        do3js(textureArray, gameWorld);

        player = new Player();
        player.position.set(3, 3, 25);
        player.rotation.order = "YXZ";
      });

    });
  });

  document.getElementById('uicontrols').style.display = "none";
}


function update(){
  requestAnimationFrame( update );
  renderer.render();
  player.update();
}

/*
* takes the array of textures and the game world and creates a renderer to render them
*
*/
function do3js(textureArray, gameWorld){

  renderer = new Renderer(textureArray);

  renderer.init(gameWorld).then(function(){

    renderer.render();
    update();

  });
}

document.getElementById('fileupload').addEventListener('change', function(){
  
  var file = this.files[0];
  var url = '/upload';
  var xhr = new XMLHttpRequest();
  var fd = new FormData();
  
  xhr.open('POST', url, true);

  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4 && xhr.status){
      alert(xhr.response);
    }
  }
  fd.append('myfile', file);

  xhr.send(fd);
});

// init();

