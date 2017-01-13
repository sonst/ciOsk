/**
 *   @author soean / https://github.com/sonst/
 */
var Utils = require('./util/Utils');
var BrowserUtils = require('./util/BrowserUtils');
var LayoutPanel = require('./controller/LayoutPanel');
var $ = require('jquery');

var ciOsk = function(doc){

  var instance  = this,
      options   = null,
      layoutPnl = null;

  this.init = function(){
    this.initUI();
    spawnLayoutPanel();
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
