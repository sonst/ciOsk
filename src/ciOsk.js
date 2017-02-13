window.jQuery = require('jquery');
window.$ = window.jQuery;

/*!
 * ciOsk 0.0.1
 *
 * https://github/
 *
 * Released under the MIT license
 * @author soean / https://github.com/sonst/
 * Date: 2017-01-20
 */

/**
 *   @author soean / https://github.com/sonst/
 */
var ApplicationState = require('./controller/ApplicationState');
var BrowserUtils     = require('./util/BrowserUtils');
var LayoutPanel      = require('./controller/LayoutPanel');
var PanelSplitType   = require('./util/PanelSplitType');
var PanelTreeUtils   = require('./util/PanelTreeUtils');
var Panel            = require('./controller/Panel');
var $                = require('jquery');

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

    //var testSerialized = '{"id":"a","panelType":"PanelSplitType.vertical","children":[{"id":"a0","panelType":"PanelSplitType.horizontal","children":[{"id":"a00","panelType":"PanelSplitType.none","children":[]},{"id":"a01","panelType":"PanelSplitType.none","children":[]}]},{"id":"a1","panelType":"PanelSplitType.vertical","children":[{"id":"a10","panelType":"PanelSplitType.none","children":[]},{"id":"a11","panelType":"PanelSplitType.none","children":[]}]}]}';
    //BrowserUtils.setLocalStorage('splitPanelState',testSerialized);

    var serializedPanel = BrowserUtils.getLocalStorage('splitPanelState');

    if(serializedPanel != null ){
      var pUtils = new PanelTreeUtils();
      rootPanel = pUtils.deserializeToDOM($('#pageLayout'), serializedPanel);
    }else{
      rootPanel = new Panel('a', PanelSplitType.NONE);
      rootPanel.setContainer($('#pageLayout'));
      rootPanel.init();
    }

    ApplicationState.rootPanel = rootPanel;
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
