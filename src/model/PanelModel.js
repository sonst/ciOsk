var PanelSplitType = require('../util/PanelSplitType');

var PanelModel = function(){
  this.id           = '';
  this.extent       = '';
  this.panelType    = PanelSplitType.NONE;
  this.children     = [];
  this.contentModel = null;
};

module.exports = PanelModel;
