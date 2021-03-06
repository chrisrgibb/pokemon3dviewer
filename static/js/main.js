var pipeline;
var imageArray = [],
  scene,
  camera,
  renderer,
  imageLoader,
  gameWorld,
  player;

function init(){
  var level = document.getElementById('levelnumber').value || 2;
  var level  =  parseInt(document.getElementById('select-level').value);

  var loader = new THREE.XHRLoader(),
      onprogress = null, 
      onError = function(res){
        if(res.type === "error"){
          alert("could not connect to server");
        }
      };

  loader.load('/leveldata/'+ level, function(blob){

    return new Promise(function(fulfill, reject){
      var data = JSON.parse(blob);
    
      pipeline = new ImagePipeline(data);
      pipeline.createTileSheet(1);

      pipeline.mapTextures().then(function(textureArray){

        gameWorld = GameWorldCreator.create(data);

        init3js(textureArray, gameWorld);

        player = new Player();
        player.rotation.order = "YXZ";
        player.setPosition(10, 6, 31);
        
      });
        document.getElementById('mapname').innerText = data.headers.name;
    });
  }, onprogress,  onError);

  // document.getElementById('uicontrols').style.display = "none";
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
function init3js(textureArray, gameWorld){

  if(renderer != null){
    renderer.removeFromDOM();
  }
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
      // alert(xhr.response);
      console.log("success");
    }
  };
  fd.append('myfile', file);

  xhr.send(fd);
});

function getValidMaps(){
  var xhr = new XMLHttpRequest();
  var url = '/levels';

  xhr.onload = function(e){
    var data = JSON.parse(this.responseText);
    var selectlist =  document.getElementById('select-level');
    selectlist.innerHTML = "";
    for( var key in data){
      var optionElement = document.createElement('option');
      optionElement.value = key;
      optionElement.innerHTML = data[key];
      selectlist.appendChild(optionElement);
    }
  };

  xhr.open('GET', url);
  xhr.send();
}

getValidMaps();
// init();

