var queryOverpass = require('query-overpass');
var BuildingType  = require('../model/EnviType');
/**
 * @author soean / https://github.com/sonst/
 */

function BuildingService() {}

// gøteborg test vector
// [57.7,11.9,57.8,12.0]

BuildingService.prototype.constructor = BuildingService;

BuildingService.prototype.getBuildingsGeoJson = function(buildingType, boundingBox, callback) {


  switch(buildingType){
    case BuildingType.BAR:
      this.getBars(boundingBox, callback);
      break;
    case BuildingType.NORMAL:
      this.getNormalBuilding(boundingBox, callback);
      break;
    case BuildingType.OFFICIAL:
      this.getOfficialBuilding(boundingBox, callback);
      break;
    case BuildingType.SIGHT:
      this.getSight(boundingBox, callback);
      break;
    default:
      throw new Error('unsupported operation');
  }
};


BuildingService.prototype.getBars = function(boundingBox, callback){
  var query = '[out:json];node('+boundingBox.join(',')+')[amenity=bar];out;';
  queryOverpass(query, function(err, geojson) {
    callback(geojson);
  });
};


BuildingService.prototype.getNormalBuilding = function(boundingBox, callback){
  var query = '[out:json];node('+boundingBox.join(',')+')[amenity=bar];out;';
  console.log(query);
  queryOverpass(query, function(err, geojson) {
    callback(geojson);
  });


};

BuildingService.prototype.getOfficialBuilding = function(boundingBox, callback){
  throw new Error('unsupported operation');
};

BuildingService.prototype.getSight = function(boundingBox, callback){
  throw new Error('unsupported operation');
};

module.exports = BuildingService;
