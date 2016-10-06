/**
 *   @author soean / https://github.com/sonst/
 *
 *   EnviPass module exposes the ability to gather geoJson by passing
 *   a location, calling the overpassAPI
 */

var BuildingService = require('./facade/BuildingService');
var GeoPoint = require('./util/GeoPoint');
var EnviType = require ('./model/EnviType');

var EnviPass = function(distance){
  var buildingService  = new BuildingService(),
      geoPoint         = new GeoPoint(),
      boundingBox      = [57.7,11.9,57.8,12.0];

  this.setArea = function(location, distance){
      boundingBox = geoPoint.getBoundingBox(location, distance);
  };

  this.geoJson = function(enviType, callback){
    buildingService.getBuildingsGeoJson(enviType, boundingBox, function(geojson){
      callback(geojson);
    });
  };

  this.buildingTest = function( callback){
    console.log(EnviType.Building.Normal);
    console.log(' -- Test Normal Buildings for bounding:');
    console.log(boundingBox);

    buildingService.getNormalBuilding( boundingBox, function(geojson){
      callback(geojson)
    });

  };


  this.Types = EnviType;
}

module.exports = new EnviPass();
