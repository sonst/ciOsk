var EnumEntry = function(name){

  this.toJSON = function(){
     return name;
  };

  this.toString = function(){
    return name;
  };

  this.getName = function(){
    return name;
  };

  this.equals = function(enumEntry){
    return enumEntry.getName() === name;
  };
}

module.exports = EnumEntry;
