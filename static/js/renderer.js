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


      renderer.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
      renderer.THREErenderer = new THREE.WebGLRenderer();

      renderer.THREErenderer.setSize( window.innerWidth, window.innerHeight );

      // maybe move this out to main method
      document.body.appendChild( renderer.THREErenderer.domElement );

      renderer.THREErenderer.setClearColor( 0xffffff, 1 );


      var directionalLight = new THREE.PointLight( 0xffffff, 4 );
      directionalLight.position.set( 10, 8, 20 );



      renderer.scene = new THREE.Scene();

      renderer.scene.add( directionalLight );

      renderer.camera.rotation.order = "YXZ";
      renderer.camera.position.set(3, 10,25);


      renderer.addWorldToScene(renderer.scene, gameWorld);

      fulfill();

    });
  },

  addWorldToScene : function(scene, world){
    var tiles = world.tiles,
    cube, texture, index;

    for(var y = 0, ylen = tiles.length; y < ylen; y++){
      for(var x = 0, xlen = tiles[0].length; x < xlen; x++){

        index = tiles[y][x];
        texture = this.textureArray[index];
        cube = this.makeCube(texture);

        cube.position.setX(x);
        cube.position.setZ(y);

        cube.position.setY(world.getHeight(index));


        scene.add(cube);

      }
    }
    var buildings = world.getBuildings()
    var frontofpokecentre = buildings[0].frontWall; // this is the 2d representation of the poke center
                                                    // which in 3d will be just the front wall



    var renderer = this;

    addArray(buildings[0].frontWall, scene);
    addArray(buildings[0].roof, scene);
    addArray(buildings[1].frontWall, scene);
    addArray(buildings[1].roof, scene);


    function addArray(array, scene){


      for(var row = 0, rowlength = array.length; row < rowlength; row++){
        for(var cell = 0, celllength = array[0].length; cell < celllength; cell++){

          var item = array[row][cell];
          texture = renderer.textureArray[item.texture];

          cube = renderer.makeCube(texture);

          cube.position.setX(item.x);
          cube.position.setZ(item.y);
          cube.position.setY(item.height);

          scene.add(cube);

        }
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
    this.camera.rotation = player.rotation;
    this.camera.position = player.position;
    this.THREErenderer.render(this.scene, this.camera);
  }

};
