function Renderer(images){
  this.camera = null;
  this.scene = null;
  this.THREErenderer = null;
  this.textureArray = images;

}

Renderer.prototype = {


  init : function(scne /*TODO fix this*/,gameWorld){
    var renderer = this;
    return new Promise(function(fulfill, reject){
      console.log('heyo');
      renderer.scene = new THREE.Scene();
      renderer.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
      renderer.THREErenderer = new THREE.WebGLRenderer();

      renderer.THREErenderer.setSize( window.innerWidth, window.innerHeight );

      // maybe move this out to main method
      document.body.appendChild( renderer.THREErenderer.domElement );

      renderer.THREErenderer.setClearColor( 0xffffff, 1 );


      var directionalLight = new THREE.PointLight( 0xffffff, 2 );
      directionalLight.position.set( 10, 8, 20 );

      renderer.scene.add( directionalLight );

      renderer.camera.rotation.order = "YXZ";
      renderer.camera.position.set(3, 10,25);



      // var img1 = pipeline.getImage(2, 4, 4);

      var img1 = renderer.textureArray[67];

      console.log(scene);
      var scene = renderer.scene;
      //  renderer = renderer.renderer,

      renderer.addWorldToScene(scene, gameWorld);

      fulfill();

    });
  },

  addWorldToScene : function(scene, world){
    var tiles = world.tiles;

    for(var y = 0, ylen = tiles.length; y < ylen; y++){
      for(var x = 0, xlen = tiles[0].length; x < xlen; x++){

        var index = tiles[y][x];
        var texture = this.textureArray[index];
        var cube = this.makeCube(texture);

        cube.position.setX(x);
        cube.position.setZ(y);

        cube.position.setY(world.getHeight(index));


        scene.add(cube);

      }
    }
  },


  makeCube : function(texture){
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );

    var material = new THREE.MeshLambertMaterial({
      color : "#333",
      vertexColors: THREE.FaceColors,
      map : texture
    });

    var cube = new THREE.Mesh( geometry, material );

    return cube;
  },


  loadTextures : function(){



  },

  render : function(){
    this.THREErenderer.render(this.scene, this.camera);


  }

};
