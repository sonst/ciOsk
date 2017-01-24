
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

module.exports = new Utils();
