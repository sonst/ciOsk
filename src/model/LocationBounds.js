/**
 * @author soean / https://github.com/sonst/
 */

var LocationBounds = function(lat_0,long_0,lat_1,long_1) {

  var instance = this;

  instance.lat0 = lat_0;
  instance.lat1 = lat_1;
  instance.long0 = long_0;
  instance.long1 = long_1;
}

module.exports = LocationBounds;

