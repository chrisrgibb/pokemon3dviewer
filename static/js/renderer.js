function Renderer(images){
  this.camera = null;
  this.scene = null;
  this.THREErenderer = null;
  this.textureArray = images;

}

Renderer.prototype = {


  init : function(gameWorld){
    var renderer = this;
    return new Promise(function(fulfill, reject){

      var screenWidth = window.innerWidth * 0.8,
          screenHeight = window.innerHeight *0.8,
          aspectRatio = screenWidth / screenHeight;

      
      renderer.camera = new THREE.PerspectiveCamera( 75, aspectRatio, 0.1, 1000 );
      renderer.THREErenderer = new THREE.WebGLRenderer();

      renderer.THREErenderer.setSize( screenWidth, screenHeight );

      // maybe move this out to main method
      document.body.appendChild( renderer.THREErenderer.domElement );

      renderer.THREErenderer.setClearColor( 0xffffff, 1 );
      renderer.scene = new THREE.Scene();


      // var directionalLight = new THREE.PointLight( 0xffffff, 4 );
      // directionalLight.position.set( 10, 8, 20 );

      var light = new THREE.AmbientLight( 0xffffff ); // soft white light
      renderer.scene.add( light );

    

      // renderer.scene.add( directionalLight );

      renderer.camera.rotation.order = "YXZ";
      renderer.camera.position.set(3, 3,25);

      renderer.loadTextures();

      renderer.addWorldToScene(renderer.scene, gameWorld);

      fulfill();

    });
  },

  addWorldToScene : function(scene, world){
    var tiles = world.tiles,
    cube, texture, index;

    var geometry = new THREE.BoxGeometry( 1, 1, 1 ); 

    for(var y = 0, ylen = tiles.length; y < ylen; y++){
      for(var x = 0, xlen = tiles[0].length; x < xlen; x++){

        index = tiles[y][x];

        var material = this.materials[index];

        cube = new THREE.Mesh( geometry, material );

        cube.position.setX(x);
        cube.position.setZ(y);

        cube.position.setY(world.getHeight(index));


        scene.add(cube);

      }
    }
    var buildings = world.getBuildings();
    var frontofpokecentre = buildings[0].frontWall; // this is the 2d representation of the poke center
                                                    // which in 3d will be just the front wall

    var buildings2 = world.getMapData();                                             

    var renderer = this;

    addArray(buildings2, scene);
    // addArray2D(buildings[0].frontWall, scene);
    // addArray2D(buildings[0].roof, scene);
    // addArray2D(buildings[1].frontWall, scene);
    // addArray2D(buildings[1].roof, scene);
    // addArray(buildings[1].walls, scene);
    // addArray(buildings[0].walls, scene);


    // function addArray2D(array, scene){


    //   for(var row = 0, rowlength = array.length; row < rowlength; row++){
    //     for(var cell = 0, celllength = array[0].length; cell < celllength; cell++){

    //       var item = array[row][cell];
    //       texture = renderer.textureArray[item.texture];

    //       cube = renderer.makeCube(texture);

    //       cube.position.setX(item.x);
    //       cube.position.setZ(item.y);
    //       cube.position.setY(item.height);

    //       scene.add(cube);

    //     }
    //   }
    // }

    function addArray(array, scene){
      for(var row = 0, rowlength = array.length; row < rowlength; row++){
        var item = array[row];

        var material = renderer.materials[item.texture];

        cube = new THREE.Mesh( geometry, material );

        cube.position.setX(item.x);
        cube.position.setZ(item.y);
        cube.position.setY(item.height);

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

  getDOMElement : function(){
    return this.THREErenderer.domElement;
  },

  removeFromDOM : function(){
    document.body.removeChild(this.THREErenderer.domElement);
  },

  loadTextures : function(){
    var len = this.textureArray.length;
    this.materials = [];
    for(var i = 0; i < len; i++){
      var texture = this.textureArray[i];

      var basicMesh = new THREE.MeshBasicMaterial({
          map : texture
        });
      this.materials.push(basicMesh);
    }
  },

  render : function(){
    this.camera.rotation = player.rotation;
    this.camera.position = player.position;
    this.THREErenderer.render(this.scene, this.camera);
  }

};
