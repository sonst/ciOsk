var PanelModel = require('./PanelModel');
var ContentModel = require('./ContentModel');

var PanelModelMapper = function(){};

PanelModelMapper.prototype.panelToPanelModel = function(panel){
    var retVal      = new PanelModel(),
        orientation = '';

    retVal.id  = panel.getId();
    retVal.panelType = panel.getPanelType();

    if(panel.hasPanelContent()){
      var contentModel = new ContentModel();
      retVal.contentModel.url = panel.getPanelContent().getUrl();
      retVal.contentModel.refreshInterval = panel.getPanelContent().getRefreshInterval();
    }
    if(panel.hasChildren()){
      orientation = PanelSplitType.VERTICAL.equals(panel.getPanelType()) ? 'width' : 'height';
      retVal.extent = panel.getChildren()[0].getElement().parent().css(orientation);
      retVal.children.push(panelToPanelModel(panel.getChildren()[0]));
      retVal.children.push(panelToPanelModel(panel.getChildren()[1]));
    }
    return retVal;
  };
