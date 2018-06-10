var EnumEntry = require('./EnumEntry');

var PanelSplitType = new PanelSplitTypeImpl();

function PanelSplitTypeImpl(){
  this.HORIZONTAL = new EnumEntry('PanelSplitType.horizontal');
  this.VERTICAL   = new EnumEntry('PanelSplitType.vertical');
  this.NONE       = new EnumEntry('PanelSplitType.none');
}

PanelSplitType.byName = function(name){
  var retVal = null;
  var obj = PanelSplitType;
  Object.getOwnPropertyNames(obj).some(function(val) {
    if(name === obj[val].getName()){
      retVal = obj[val];
      return true;
    }
  });
  if(retVal === null){
    throw new Error('given enum entry <'+name+'> does not exist!');
  }
  obj = null;
  return retVal;
};

module.exports = PanelSplitType;
