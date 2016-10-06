var BuildingMapper = function(){};

BuildingMapper.prototype.BuildingByGeoJson(feature){
  var retVal = new Building();
  retVal.features = features;



  return retVal;
};

BuildingMapper.prototype.geoJsonByBuilding(building){
  return JSON.stringify(building.features);
};

module.exports = new BuildingMapper();
