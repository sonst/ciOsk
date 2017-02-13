
var LayoutPanel    = require('../../src/controller/LayoutPanel');


var PanelLayoutDriver = function(){

  var layoutPnl = null;
  var options = {
      uiContent:              true,
      idLayout:               'pageLayout2',
      idBtnFullscreen:        'layoutBtnFs',
      idBtnSaveConfig:        'layoutBtnSave',
      classActive:            'ui-active',
      classLayout:            'page-layout-container',
      classLayoutUIContainer: 'layout-ui-container',
      classLayoutButton:      'layout-btn',
      classLayoutLogo:        'layout-logo'
    };
  var instance = this;

  this.init = function(){
    layoutPnl = buildLayoutPanel();
  };

  var buildLayoutPanel = function(){
    return new LayoutPanel('body',options);
  };

  this.getLayoutPanel = function(){
    return layoutPnl;
  };

  instance.init();
};


module.exports = PanelLayoutDriver;
