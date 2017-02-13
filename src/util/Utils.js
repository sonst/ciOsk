var util = require('util');

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

Utils.prototype.printObjectTree = function(object){
  console.log(util.inspect(object,{depth: null}));
};

module.exports = new Utils();
