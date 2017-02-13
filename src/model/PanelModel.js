var PanelSplitType = require('../util/PanelSplitType');
var ContentModel = require('./ContentModel');

var PanelModel = function(){
  this.id        = '';
  this.extent    = '';
  this.panelType = PanelSplitType.NONE;
  this.children  = [];

  this.contentModel = new ContentModel();
};

module.exports = PanelModel;
