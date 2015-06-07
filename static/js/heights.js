function Heights(){




}

Heights.prototype = {

  computeHeights : function(data){



    var height = data.length,
        width = data[0].length,
        heights = {},
        index = 0,
        end = height * width;

    var sections = [];


    var parse = function(section, index){
      var i 






    }





    while(index < end-1){

      var x = index % width,
          y = Math.floor(index / width),
          startTile,
          currentTile,
          nextTile;

          currentTile = data[y][x];
      console.log(y + " " + x);


      var cliff = {
        startTiles : [17, 55],
        endTiles : [36, 52]
      }




      if ((currentTile === 17 && x === 0 ) ||
          (currentTile === 55 && x === 0 )) {
            startTile = currentTile; // for future reference

        // find end of first row that will give us the width
        var i = x,
            j = x + 1,
            nextTile = data[y][j];
        var foundEnd = false;


        while(!foundEnd){
          i++; j++;
          currentTile = data[y][i];
          nextTile = data[y][j];

          if((currentTile === 36 || currentTile === 52) && nextTile !== 36){
            foundEnd = true;

            var section = {
              start : x,
              end : i,
              y : y
            };

            sections.push(section);
            // convert back into 2d coordinates
            index = i + (y * width);

          }
        }
        debugger;

      }

      // if( currentTile === 76){
      //   var i = x,
      //     j = x + 1,
      //     nextTile = data[y][j],
      //     foundWidth = false,
      //     foundHeight = false,
      //     currentRow = y;
      //
      //
      //   var details = {
      //     x : x,
      //     y : y,
      //     width: null,
      //     height: null
      //     // heightOf:roof
      //   }
      //
      //
      //   while(!foundWidth){
      //     i++; // j++;
      //     currentTile = data[currentRow][i];
      //     // first get width
      //
      //     if(currentTile === 77){
      //       // found the end of the first row
      //       foundWidth = true;
      //       details.width = i - details.x + 1;
      //       currentRow++;
      //       // i = details.x;
      //     }
      //   }
      //   while(!foundHeight){
      //     currentTile = data[currentRow][i];
      //     currentRow++;
      //     if(currentTile === 79){
      //       foundHeight = true;
      //       details.height = i - details.y + 1;
      //       debugger;
      //     }
      //   }

      // }


      index++;
    }







    // debugger;
    return "s";
  },

  getHeights : function(x, y){



  }

}
