var PanelSplitType = require('../../src/util/PanelSplitType');

var describe   = require('mocha').describe,
    it         = require('mocha').it,
    expect     = require('chai').expect,
    beforeEach = require('mocha').beforeEach;

describe('The PanelSplitTypeEnum', function () {

  describe('↳ items are comparable', function () {

    it('returns false comparing two different entries', function(){
      var entryOne = PanelSplitType.VERTICAL;
      var entryTwo = PanelSplitType.HORIZONTAL;
      var entryThree = PanelSplitType.NONE;
      expect(entryOne.equals(entryTwo)).to.equal(false);
      expect(entryOne.equals(entryThree)).to.equal(false);
      expect(entryTwo.equals(entryThree)).to.equal(false);
      expect(entryTwo.equals(entryOne)).to.equal(false);
      expect(entryThree.equals(entryTwo)).to.equal(false);
      expect(entryThree.equals(entryOne)).to.equal(false);
    });

    it('returns true comparing two equal entries', function(){
      var entryOne = PanelSplitType.VERTICAL;
      var entryTwo = PanelSplitType.VERTICAL;
      expect(entryOne.equals(entryTwo)).to.equal(true);
      expect(entryTwo.equals(entryOne)).to.equal(true);
      expect(entryOne.equals(entryOne)).to.equal(true);
    });

  });

  describe('↳ can be created', function () {

    it('providing the enum items name', function(){
      var vertical = PanelSplitType.VERTICAL.getName();
      var horizontal = PanelSplitType.HORIZONTAL.getName();
      var none = PanelSplitType.NONE.getName();
      expect(PanelSplitType.byName(vertical)).to.deep.equal(PanelSplitType.VERTICAL);
      expect(PanelSplitType.byName(horizontal)).to.deep.equal(PanelSplitType.HORIZONTAL);
      expect(PanelSplitType.byName(none)).to.deep.equal(PanelSplitType.NONE);
    });

    it('forth and back', function(){
      var entry = PanelSplitType.NONE;
      var entryName = entry.getName();
      var materialized = PanelSplitType.byName(entryName);
      expect(materialized.equals(entry)).to.equal(true);
    });

  });
});
