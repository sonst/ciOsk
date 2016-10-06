/**
 * @author soean / https://github.com/sonst/
 */

var should   = require('chai').should(),
    assert   = require('assert'),
    GeoPoint = require('../../src/util/GeoPoint'),
    posLab   = [52.508, 13.431];


describe('#GeoPoint Tests', function() {

  it('calculates a bounding box', function() {
      var distance = 100.0;
      var geoInstance = new GeoPoint(posLab,distance);
      var expectedBoundingBox = [
        51.58441775265144,
        12.532679504663108,
        53.431582247348565,
        14.329320495336894
      ];
      assert.equal(geoInstance.getBoundingBox()[0], expectedBoundingBox[0]);
      assert.equal(geoInstance.getBoundingBox()[1], expectedBoundingBox[1]);
      assert.equal(geoInstance.getBoundingBox()[2], expectedBoundingBox[2]);
      assert.equal(geoInstance.getBoundingBox()[3], expectedBoundingBox[3]);
    });


});
