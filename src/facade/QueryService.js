var queryOverpass = require('query-overpass');

function QueryService(){}

/**b TODO SOS: check the 'around' option on overPAssAPI QL in order to get rid of geoPoint calculation*/

QueryService.prototype.queryOverpass = function(query, callback){
  queryOverpass(query, function(err, geojson) {
    callback(geojson);
  });
};



module.exports = QueryService;
