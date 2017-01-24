window.jQuery = require('jquery');
window.$ = window.jQuery;

/**
 *   @author soean / https://github.com/sonst/
 */
//var Utils        = require('./util/Utils');
var BrowserUtils = require('./util/BrowserUtils');
var LayoutPanel  = require('./controller/LayoutPanel');
var PanelSplitType = require('./util/PanelSplitType');
var Panel        = require('./controller/Panel');


var $            = require('jquery');
                   require('jquery-ui');




var ciOsk = function(doc){

  var instance  = this,
      options   = null,
      layoutPnl = null,
      rootPanel = null;

  this.init = function(){
    this.initUI();
    spawnLayoutPanel();
    createRootPanel();
    console.log('inited on');
  };

  var spawnLayoutPanel = function(){
    options = {
      uiContent:              true,
      idLayout:               'pageLayout',
      idBtnFullscreen:        'layoutBtnFs',
      classActive:            'ui-active',
      classLayout:            'page-layout-container',
      classLayoutUIContainer: 'layout-ui-container',
      classLayoutButton:      'layout-btn',
      classLayoutLogo:        'layout-logo'
    };
    layoutPnl = new LayoutPanel('body', options);

  };

  var createRootPanel = function(){
    rootPanel = new Panel('a', PanelSplitType.NONE);
    rootPanel.setContainer($('#pageLayout'));
    rootPanel.init();
  };

  this.initUI = function(){
    BrowserUtils.domZoomPrevention();
    BrowserUtils.suppressBrowsersContextMenuBehaviour();
   // BrowserUtils.initI18n(onUIReady);
  };

  $(document).ready(function(){
     instance.init();
  });

}

module.exports = new ciOsk();
