var StringBuffer = require('../../src/util/StringBuffer');

var describe       = require('mocha').describe,
    it             = require('mocha').it,
    expect         = require('chai').expect,
    beforeEach     = require('mocha').beforeEach;


describe('The StringBuffer', function () {

  describe('- function append', function () {
    var sb = null;
    beforeEach(function () {
      sb = new StringBuffer();
    });
    it('does get instanciated correctly', function(){
      expect(StringBuffer.prototype.isPrototypeOf(sb));
      expect(sb.buffer.length).to.equal(0);
      expect(sb.index).to.equal(0);
    });
    it('appends a string to the buffer', function(){
      sb.append('1');
      sb.append('2');
      sb.append('3');
      sb.append('4');
      expect(sb.buffer.length).to.equal(4);
      expect(sb.index).to.equal(4);
    });
  });

  describe('- function toString', function () {
    var sb = null;
    beforeEach(function () {
      sb = new StringBuffer();
      sb.append('1,');
      sb.append('2,');
      sb.append('3,');
      sb.append('4');
    });
    it('will concatenate the given string',function(){
      expect(sb.toString()).to.equal('1,2,3,4');
      expect(sb.toString().split(',').length).to.equal(4);
    });
  });

  describe('- function join', function () {
    var sb = null;
    var delimiter = ',';
    beforeEach(function () {
      sb = new StringBuffer();
      sb.append('1');
      sb.append('2');
      sb.append('3');
      sb.append('4');
    });
    it('will concatenate the given string using the given delimiter',function(){
      expect(sb.join(',')).to.equal('1,2,3,4');
      expect(sb.join(',').split(',').length).to.equal(4);
    });
  });
});
