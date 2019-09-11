var Panel             = require('../../src/controller/Panel'),
    PanelSplitType    = require('../../src/util/PanelSplitType'),
    PanelLayoutDriver = require('./PanelLayoutDriver'),
    $                 = require('jquery');

var PanelDriver = function(){
  var panel = null,
      panelId = 'a',
      layoutPnl,
      options,
      instance = this;

  this.init = function(){
    layoutPnl = new PanelLayoutDriver().getLayoutPanel();
    panel = buildPanel();
  };

  var buildPanel = function(){
    var retVal =  new Panel(panelId, PanelSplitType.NONE);
    retVal.setContainer($('#'+layoutPnl.getOptions().idLayout));
    retVal.init();
    return retVal;
  };

  this.getLayoutPanel = function(){
    return layoutPnl;
  };

  this.getOptions = function(){
    return options;
  };

  this.getPanel = function(){
    return panel;
  };

  this.getPanelId = function(){
    return panelId;
  };

  this.remove = function(){
    instance.getPanel().remove();
  };

  instance.init();
};

module.exports = PanelDriver;
