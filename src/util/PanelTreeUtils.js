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

    if(rootPanelModel.children.length > 0){
      rootPanel.splitPanel(PanelSplitType.byName(rootPanelModel.panelType));

      var orientation = PanelSplitType.VERTICAL.equals(rootPanel.getPanelType()) ? 'width' : 'height';
      rootPanel.getChildren()[0].getElement().parent().css(orientation, rootPanelModel.extent);

      panelModelToPanel(rootPanelModel.children[0], rootPanel.getChildren()[0]);
      panelModelToPanel(rootPanelModel.children[1], rootPanel.getChildren()[1]);
    }
    return rootPanel;
  };

  var panelModelToPanel = function(parentModel, parentPanel){
    if(parentModel.children.length > 0){
      parentPanel.splitPanel(PanelSplitType.byName(parentModel.panelType));

      var orientation = PanelSplitType.VERTICAL.equals(parentPanel.getPanelType()) ? 'width' : 'height';
      parentPanel.getChildren()[0].getElement().parent().css(orientation, parentModel.extent);

      panelModelToPanel(parentModel.children[0], parentPanel.getChildren()[0]);
      panelModelToPanel(parentModel.children[1], parentPanel.getChildren()[1]);
    }
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
