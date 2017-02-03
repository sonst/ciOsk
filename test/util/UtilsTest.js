var Utils = require('../../src/util/Utils');

var describe       = require('mocha').describe,
    it             = require('mocha').it,
    expect         = require('chai').expect,
    beforeEach     = require('mocha').beforeEach;


describe('The Utils', function () {

  describe('- function mergeObjects', function () {
    var objectOne,
        objectTwo;

    beforeEach(function () {
      objectOne = {
        attrOne : 'one',
        attrTwo : 'two',
        attrThree : 'three'
      };
      objectTwo = {
        attrOne : '',
        attrTwo : '',
        attrThree : ''
      };
    });

    it('merges two equal objects', function(){
      Utils.mergeObjects(objectOne, objectTwo);
      expect(objectTwo).to.deep.equal(objectOne);
    });

    it('merges two different objects', function(){
      Utils.mergeObjects({attrOne:'1'}, objectTwo);
      expect(objectTwo.attrOne).to.equal('1');
    });

  });

  describe('- function isArray', function () {

    it('returns true if the given is an array',function(){
      expect(Utils.isArray([1,2,3])).to.equal(true);
      expect(Utils.isArray([])).to.equal(true);
    });
    it('returns false if the given is not an array',function(){
      expect(Utils.isArray({})).to.equal(false);
      expect(Utils.isArray(1)).to.equal(false);
      expect(Utils.isArray('fuz')).to.equal(false);
    });

  });

});
