var LayoutPanelMarkup = require('../view/LayoutPanelMarkup');
var LayoutPanelAction = require('../view/LayoutPanelAction');
var Utils             = require('../util/Utils');
var $                 = require('jquery');

var LayoutPanel = function(parentSelector, options){

  var instance = this,
      options = Utils.mergeObjects( options , {
        uiContent:              true,
        idLayout:               'pageLayout',
        idBtnFullscreen:        'layoutBtnFs',
        classActive:            'ui-active',
        classLayout:            'page-layout-container',
        classLayoutUIContainer: 'layout-ui-container',
        classLayoutButton:      'layout-btn',
        classLayoutLogo:        'layout-logo'
      });

  this.actions = null;

  this.markup  = null;

  this.init = function(){
    instance.markup =  new LayoutPanelMarkup(options);
    instance.actions = new LayoutPanelAction(options);
    instance.initDom();
    instance.actions.initEvents();
  };

  this.initDom = function(){
    if($('#'+options.idLayout).length==0){
      $(parentSelector).append(instance.markup.getLayoutContainer());
    } else {
      throw new Error('duplicate id');
    }
  };

  this.destroy = function(){
    instance.actions.removeEvents();
    $('#'+options.idLayout).remove();
  };

  this.getElement = function(){
    return $('#'+options.idLayout);
  };

  this.getOptions = function(){
    return options;
  };

  instance.init();
}

module.exports = LayoutPanel;
