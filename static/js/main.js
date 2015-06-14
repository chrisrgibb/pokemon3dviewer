var pipeline;
var imageArray = [],
  scene,
  camera,
  renderer,
  imageLoader,
  gameWorld,
  player;

function init(){
  var level = 4;

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
        player.position.set(3, 10, 25);
        player.rotation.order = "YXZ";


      });

    });
  });

}


init();

function update(){
  requestAnimationFrame( update );
  renderer.render();
  player.update();
}

function do3js(textureArray, gameWorld){

  renderer = new Renderer(textureArray);

  renderer.init(null, gameWorld).then(function(){

    renderer.render();
    update();

  });



}
