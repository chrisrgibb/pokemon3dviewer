function BuildingParser(){
	this.sidewall = 75;

}

BuildingParser.prototype =  {
  mapHeights : function(sections){
    var computedHeights = []; // front of building

    sections.forEach(function(section, index){
      // each section represents one building from the roof(if it has one) to the bottom

      var height = section.rows.length,
          topleftcorner = section.rows[0].data[0];



      if(height > 1 && topleftcorner===76){

        // start of building = x and y - roofsize ( 4 ) which is the top left corner
        // height will be height - roofsize
        var roofsize = 4,
            buildingHeight = height - roofsize,
            buildingX = section.rows[0].x,
            // for the next line roofsize can be changed to buildingheight 
            buildingY = section.rows[0].y + roofsize, // start of building without the roof 
            width = section.rows[0].width; // assumption that the width doesn't change

        var building = {
          x : buildingX,
          y : buildingY,
          height : buildingHeight, // height on Y axis
          roof : null,
          frontWall : null
        };

        /*
        *   create roofs
        */

        if(topleftcorner===76){ // double check again because i might change it
          building.roof = this.convertRoof(section, roofsize, buildingHeight);
        }

        building.frontWall = this.convertBuildingFront(section.rows, height, roofsize);

        building.walls = this.createWalls(buildingX, buildingY, width, buildingY, buildingHeight); // should be front of building height?

        computedHeights.push(building);

      }
    }, this);

    return computedHeights;
  },

  turnbuildingintodata : function(building){


  },

  createWalls : function(ox, oy, dx, dy, height, frontWallSize){
    var wallArray = [];
    // create rear wall
    for(var xx = ox; xx < ox + dx; xx++){
      for(var j = 0; j < height; j++){
        wallArray.push({
          x : xx,
          y : oy,
          height : j+1,
          texture : this.sidewall
        });
      }
    }

    function createSideWall(xposition, texture){
      /* x = X
         y = Z
         height = y
         yy = Z
      */


     for(var yy = oy+1; yy < oy+ height - 1; yy++){
        for(var j = 0; j < height; j++){
          wallArray.push({
            x : xposition,
            y : yy,
            height : j+1,
            texture : texture
          });
        }
      }
    }

    createSideWall(ox, this.sidewall);// left
    createSideWall(ox + dx-1, this.sidewall); //right

   
    return wallArray;
  },

  convertBuildingFront : function(rows, height, buildingHeight){
     

    var collectHeights = [];
    var yposition = rows[rows.length-1].y; // this will eventually be the Z position for the front of the building

    for(var i = height-1; i >= buildingHeight; i--){
      // start at bottom of wall
      var rw = rows[i];

      rw.height = height - i; // height of row

      var translatedRow = this.translateRow(rw, null, yposition );

      collectHeights.push(translatedRow);

    }
    return collectHeights;
  },


  // turns all the tiles for roofs from a number into an object containing, x, y, height and the tile index
  convertRoof : function(section , roofsize, buildingHeight){
    var roof = [];
    // TODO need to find y offset

    for(var i = 0; i < roofsize; i++){  // should use buildingHeight as the length 
      //however need to change the code to take into account roofs that are 
      //bigger than 4 wide
      // 
      var row = section.rows[i];
      // turn each index into a object with x y coordinates
      var newrow = this.translateRow(row, roofsize + 1);


      newrow.forEach(function(item){
        var roofsize = this;
        item.y += roofsize;
        item.height = buildingHeight + 1; // just a guess based on the size of the roof
      }, roofsize);


      roof.push(newrow);
    }
    return roof;
  },

  /*
   * gets a row of tile numbers that form a building and converts that data into its
   * 3d representation
   */
  translateRow : function(row, height, y){

    var mapTiles = function(tileIndex, index, array){
      var row = this.row,
          height = this.height,
          translatedY = this.y || row.y;

      return  {
        x : row.x + index,
        y : translatedY,
        height : row.height || height,
        texture : tileIndex
      }
    }

    return row.data.map(mapTiles, {
      row : row,
      height : height,
      y : y
    }); // pass in as scope
  }
};