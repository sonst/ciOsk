var PanelSplitType = require('./PanelSplitType');
var Panel          = require('../../src/controller/Panel');
var PanelModel     = require('../../src/model/PanelModel');
var ContentModel   = require('../../src/model/ContentModel');
var $              = require('jquery');

var PanelTreeUtils = function(){

  this.serialize = function(root){
    return JSON.stringify(panelToPanelModel(root));
  };

  this.deserializeToDOM = function(container, serializedRoot){
    var rootPanelModel = JSON.parse(serializedRoot);
    var rootPanel = new Panel(rootPanelModel.id, PanelSplitType.NONE);
    rootPanel.setContainer(container);
    rootPanel.init();
    panelModelToPanel(rootPanelModel, rootPanel);
    return rootPanel;
  };

  var panelModelToPanel = function(panelModel, panel){
    if(panelModel.children.length > 0){
      panel.splitPanel(PanelSplitType.byName(panelModel.panelType));
      resetSize(panel, panelModel.extent);
      panelModelToPanel(panelModel.children[0], panel.getChildren()[0]);
      panelModelToPanel(panelModel.children[1], panel.getChildren()[1]);
    } else if(panelModel.contentModel !== null){
        panel.addPanelContent(panelModel.contentModel.url);
    }
  };

  var resetSize = function(panel, extent){
      var orientation = PanelSplitType.VERTICAL.equals(panel.getPanelType()) ? 'width' : 'height';
      panel.getChildren()[0].getElement().parent().css(orientation, extent);
  };

  var panelToPanelModel = function(panel){
    var retVal      = new PanelModel(),
        orientation = '';

    retVal.id  = panel.getId();
    retVal.panelType = panel.getPanelType();


    if(panel.hasChildren()){
      orientation = PanelSplitType.VERTICAL.equals(panel.getPanelType()) ? 'width' : 'height';
      retVal.extent = panel.getChildren()[0].getElement().parent().css(orientation);
      retVal.children.push(panelToPanelModel(panel.getChildren()[0]));
      retVal.children.push(panelToPanelModel(panel.getChildren()[1]));
    } else if(panel.hasPanelContent()){
      retVal.contentModel = new ContentModel();
      retVal.contentModel.url = panel.getPanelContent().getUrl();
      retVal.contentModel.refreshInterval = panel.getPanelContent().getRefreshInterval();
    }
    return retVal;
  };

  var panelContentToContentModel = function(panelContent){
    var retVal = new ContentModel();
    retVal.url = panelContent.getUrl();
    retVal.refreshInterval = panelContent.getRefreshInterval();
    return retVal;
  };

};

module.exports = PanelTreeUtils;
