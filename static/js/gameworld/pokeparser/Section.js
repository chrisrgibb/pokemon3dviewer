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