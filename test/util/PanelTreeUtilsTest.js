require('../testUtils/JsDomUtil');
var describe          = require('mocha').describe,
    it                = require('mocha').it,
    expect            = require('chai').expect,
    beforeEach        = require('mocha').beforeEach,
    $                 = require('jquery'),
    PanelSplitType    = require('../../src/util/PanelSplitType'),
    PanelDriver       = require('../testUtils/PanelDriver'),
    PanelLayoutDriver = require('../testUtils/PanelLayoutDriver'),
    PanelTreeUtils    = require('../../src/util/PanelTreeUtils');

describe('The PanelTreeeUtils', function () {

  describe('↳ function getPanelTree', function(){

    var panelUtil = null;

    beforeEach(function(){
      panelUtil = new PanelDriver();
    });

    afterEach(function(){
      panelUtil.remove();
      panelUtil.getLayoutPanel().destroy();
    });

    it('can serialize a PanelTree', function(){
      var panel = panelUtil.getPanel();
      var pUtils = new PanelTreeUtils();
      var jsonExpected = '{"id":"a","extent":"0px","panelType":"PanelSplitType.vertical","children":[{"id":"a0","extent":"0px","panelType":"PanelSplitType.horizontal","children":[{"id":"a00","extent":"","panelType":"PanelSplitType.none","children":[],"contentModel":null},{"id":"a01","extent":"","panelType":"PanelSplitType.none","children":[],"contentModel":null}],"contentModel":null},{"id":"a1","extent":"0px","panelType":"PanelSplitType.vertical","children":[{"id":"a10","extent":"","panelType":"PanelSplitType.none","children":[],"contentModel":null},{"id":"a11","extent":"","panelType":"PanelSplitType.none","children":[],"contentModel":null}],"contentModel":null}],"contentModel":null}';
      panel.splitPanel(PanelSplitType.VERTICAL);
      panel.getChildren()[0].splitPanel(PanelSplitType.HORIZONTAL);
      panel.getChildren()[1].splitPanel(PanelSplitType.VERTICAL);
      expect(pUtils.serialize(panel)).to.equal(jsonExpected);
    });

    it('can deserialize a PanelTree', function(){
      panelUtil.remove();
      panelUtil.getLayoutPanel().destroy();

      var panel = panelUtil.getPanel();
      panelUtil.remove();
      var pUtils = new PanelTreeUtils();
      var serialized = '{"id":"a","extent":"0px","panelType":"PanelSplitType.vertical","children":[{"id":"a0","extent":"0px","panelType":"PanelSplitType.horizontal","children":[{"id":"a00","extent":"","panelType":"PanelSplitType.none","children":[],"contentModel":null},{"id":"a01","extent":"","panelType":"PanelSplitType.none","children":[],"contentModel":null}],"contentModel":null},{"id":"a1","extent":"0px","panelType":"PanelSplitType.vertical","children":[{"id":"a10","extent":"","panelType":"PanelSplitType.none","children":[],"contentModel":null},{"id":"a11","extent":"","panelType":"PanelSplitType.none","children":[],"contentModel":null}],"contentModel":null}],"contentModel":null}';
      var container = new PanelLayoutDriver().getLayoutPanel().getElement();

      pUtils.deserializeToDOM(container, serialized);

      // console.log(window.document.documentElement.outerHTML);
      expect($('#a').length).to.equal(1);
      expect($('#a0').length).to.equal(1);
      expect($('#a00').length).to.equal(1);
      expect($('#a01').length).to.equal(1);
      expect($('#a1').length).to.equal(1);
      expect($('#a10').length).to.equal(1);
      expect($('#a11').length).to.equal(1);

    });
  });
});
