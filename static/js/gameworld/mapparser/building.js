function Building(config){
  this.startTiles = [15, 76, 78, 90,92 ];
  this.endTiles = [31, 77, 79, 90, 93];
  this.sidewall = 75;

  // this.startCharacters =

  this.sections = [];
  this.rows = [];
}



Building.prototype = {

  parse : function(){


  },

  match : function(currentTile, currentIndex){
    return this.startTiles.indexOf(currentTile) > -1;

  },

  isEnd : function(currentTile, nextTile){
    return this.endTiles.indexOf(currentTile) > -1 &&
           this.endTiles.indexOf(nextTile) === -1;
  },

  add : function(row){
    var len = this.sections.length;
    if(len===0){
      var newSection = new Section();
      newSection.add(row);

      this.sections.push(newSection);
    } else {
      // check all sections to see if we can add to them
      for(var i = 0; i < len; i++){

        var section = this.sections[i];

        if(section.canAdd(row)) {
          section.add(row);
          return;
        }

      }
      var newSection = new Section();
      newSection.add(row);

      this.sections.push(newSection);
    }
  },

  mapHeights : function(){
    this.computedHeights = []; // front of building

    this.sections.forEach(function(section, index){
      // each section represents one building from the roof(if it has one) to the bottom

      var height = section.rows.length,
          topleftcorner = section.rows[0].data[0];



      if(height > 1 && topleftcorner===76){

        // start of building = x and y - roofsize ( 4 ) which is the top left corner
        // height will be height - roofsize
        var roofsize = 4,
            buildingHeight = height - roofsize,
            buildingX = section.rows[0].x,
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
          building.roof = this.convertRoof(section, roofsize);
        }


        function convertBuildingFront(rows){
          var collectHeights = [];
          var yposition = rows[rows.length-1].y; // this will eventually be the Z position for the front of the building

          for(var i = height-1; i >= buildingHeight; i--){
            // start at bottom of wall
            var rw = rows[i];

            rw.height = height - i; // height of row

            var translatedRow = buildingjs.translateRow(rw, null, yposition );

            collectHeights.push(translatedRow);

          }
          return collectHeights;
        }

        var buildingjs = this;

        building.frontWall = convertBuildingFront(section.rows);

        this.createWalls(buildingX, buildingY, width, buildingY, height);

        this.computedHeights.push(building);

      }
    }, this);

    return this.computedHeights;
  },

  turnbuildingintodata : function(building){


  },

  createWalls : function(ox, oy, dx, dy, height){



  },

  // turns all the tiles for roofs from a number into an object containing, x, y, height and the tile index
  convertRoof : function(section , roofsize){
    var roof = [];

    for(var i = 0; i < roofsize; i++){
      //
      var row = section.rows[i];
      // turn each index into a object with x y coordinates
      var newrow = this.translateRow(row, roofsize + 1);


      newrow.forEach(function(item){
        var roofsize = this;
        item.y += roofsize;
        item.height = roofsize + 1; // just a guess based on the size of the roof
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

      // debugger;
      var translated = {
        x : row.x + index,
        y : translatedY,
        height : row.height || height,
        // height : height-1,
        texture : tileIndex
      }

      return translated;
    }

    return row.data.map(mapTiles, {
      row : row,
      height : height,
      y : y
    }); // pass in as scope
  }
}

function Section(){
  this.rows = [];
  this.size = 0;
  this.translated = {};

  this.canAdd = function(row){
    if(this.size === 0){
      return true;
    }
    var lastRow = this.rows[this.size-1];
    if(lastRow.x === row.x && lastRow.y+1 === row.y){
      return true;
    }
    return false;
  }

  this.add = function(row){
    if(this.canAdd(row)){
      this.rows.push(row);
      this.size += 1;
      return true;
    } else {
      return false;
    }
  }

}
