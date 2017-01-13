
var Utils = function(){  }

Utils.prototype.isArray = function(obj){
  return Object.prototype.toString.call(obj) === '[object Array]';
};

module.exports = new Utils();
