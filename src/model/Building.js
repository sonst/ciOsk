/**
 * @author soean / https://github.com/sonst/
 */

var Building = function(identifier) {
	this.id = identifier;
	this.points = [];
  this.features = [];
  this.style = ;
};

Building.prototype.byFeature = function(){


};

Building.prototype.getFeatures = function(){
  return this.features;
};

Building.prototype.Type = function(){
    this.NORMAL = 'Building.Type.NORMAL';
    this.SIGHT  = 'Building.Type.SIGHT';
    this.OFFICIAL = 'Building.Type.OFFICIAL';
};

module.exports = Building;
