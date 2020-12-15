var Utils = function(){}

Utils.prototype.isArray = function(obj){
  return Object.prototype.toString.call(obj) === '[object Array]';
};

Utils.prototype.mergeObjects = function(from, to){
  var attr;
  for (attr in from) {
    to[attr] = from[attr];
  }
  return to;
};

Utils.prototype.isEmpty = function(obj) {
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop))
      return false;
  }

  return JSON.stringify(obj) === JSON.stringify({});
}

Utils.prototype.getFunctionName = function(fn) {
  var ret = fn.toString();
  ret = ret.substr('function '.length);
  ret = ret.substr(0, ret.indexOf('('));
  return ret;
}


module.exports = new Utils();
