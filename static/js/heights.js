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

    var cliff = new Cliff();
    var building = new Building();

    var parse = function(elem){
      // find end of first row that will give us the width
      var i = x,
          j = x + 1;
          nextTile = data[y][j];
      var foundEnd = false;


      while(!foundEnd){
        i++; j++;
        currentTile = data[y][i];
        nextTile = data[y][j];

        if(elem.isEnd(currentTile, nextTile)){
          foundEnd = true;
          debugger;
          var row = {
            start : x,
            end : i,
            y : y
          };

          elem.add(row);

          index = i + (y * width);


          return i + (y * width);
        }
      }

      return -1;
    };




    while(index < end-1){

      var x = index % width,
          y = Math.floor(index / width),
          startTile,
          currentTile,
          nextTile;
  
          currentTile = data[y][x];
      console.log(y + " " + x + " index : " + index);

      if(cliff.match(currentTile, index)) {
        parse(cliff);
      }
      if(building.match(currentTile, index)){
        parse(building);
      }

      index++;
    }
    return {
      buildings : building,
      cliffs : cliff
    };
  },

  getHeights : function(x, y){
    return null;


  }

};
