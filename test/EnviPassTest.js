var should = require('chai').should(),
    assert = require('assert'),
    envi = require('../src/EnviPass');
    util = require('util'),
    geoPoint = require('./util/GeoPointTest');

//console.log(util.inspect(assert,false,null));


describe('#exposes API', function() {
  describe('#exposes EnviType', function() {
    var EnviTypeLocal = require('../src/model/EnviType');
    it('can incorporate EnviType', function() {
      assert.notEqual(EnviTypeLocal, 'undefined');
      assert.deepEqual(EnviTypeLocal, envi.Types);
    });
    it('exposes Type.Building', function() {
      assert.notEqual(EnviTypeLocal.Building, 'undefined');
      assert.deepEqual(EnviTypeLocal.Building, envi.Types.Building);
    });
    it('exposes Type.Way', function() {
      assert.notEqual(EnviTypeLocal.Way, 'undefined');
      assert.deepEqual(EnviTypeLocal.Way, envi.Types.Way);
    });
  });
});



/*
describe('#gathers building', function() {
  this.timeout(15000);
  var positionBerlin = [52.508, 13.431];
  var positionGoeteborg = [57.7,11.9];


  it('gathers a bar', function(done) {
    envi.setArea(positionGoeteborg, 100.0);
    envi.buildingTest(function(geoJson){
      //console.log(util.inspect(geoJson, false, null));
      assert.equal(geoJson.features.length, 28);
      done();
    })
  });


  it('gathers a normal building', function(done) {
    envi.setArea(positionGoeteborg, 10.0);
    console.log(envi.Types.Building.NORMAL);
    envi.geoJson(envi.Types.Building.NORMAL, function(geoJson){
      console.log(util.inspect(geoJson, false, null))
      assert.equal(geoJson.features.length, 28);
      done();
    })
  });
});


describe('#equals', function() {
  it('verifies two vectors are equal', function() {
    vec = [1, 2, 3, 4];
    envi.equals(vec,vec).should.equal(true);
  });

  it('verifies two vectors of different length are not equal', function() {
    vec1 = [1, 2, 3, 4];
    vec2 = [1, 2, 3];
    envi.equals(vec1,vec2).should.equal(false);
  });

  it('verifies two vectors with different elements are not equal', function() {
    vec1 = [1, 2, 3, 4];
    vec2 = [1, 2, 3, 5];
    envi.equals(vec1,vec2).should.equal(false);
  });
});
*/
