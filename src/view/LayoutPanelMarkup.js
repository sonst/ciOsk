var StringBuffer = require('../util/StringBuffer');
var Utils        = require('../util/Utils');

var LayoutPanelMarkup = function(options){
  this.options =  Utils.mergeObjects( options , {
    uiContent:              true,
    idLayout:               'pageLayout',
    idBtnFullscreen:        'layoutBtnFs',
    idBtnSaveConfig:        'layoutBtnSave',
    classActive:            'ui-active',
    classLayout:            'page-layout-container',
    classLayoutUIContainer: 'layout-ui-container',
    classLayoutButton:      'layout-btn',
    classLayoutLogo:        'layout-logo'
  });
};

LayoutPanelMarkup.prototype.getLayoutContainer = function(){
  var retVal = new StringBuffer();
  retVal.append('<div id="'+this.options.idLayout+'" class="'+this.options.classLayout+'" >');
  if (this.options.uiContent) {
    retVal.append(this.getLayoutUIContainer());
  }
  retVal.append('</div>');
  return retVal.toString();
};

LayoutPanelMarkup.prototype.getLayoutUIContainer = function(){
  var retVal = new StringBuffer();
  retVal.append('<div class="'+this.options.classLayoutUIContainer+'">');
  retVal.append(this.getLayoutButtonMarkup());
  retVal.append('</div>');
  return retVal.toString();
};

LayoutPanelMarkup.prototype.getLayoutButtonMarkup = function(){
  var retVal = new StringBuffer();
  retVal.append(this.getLayoutLogoMarkup());
  retVal.append(this.getFullScreenBtnMarkup());
  retVal.append(this.getSaveConfigBtnMarkup());
  return retVal.toString();
};

LayoutPanelMarkup.prototype.getLayoutLogoMarkup = function(){
  var retVal = new StringBuffer();
  retVal.append('<div class="'+this.options.classLayoutLogo+'"></div>');
  return retVal.toString();
};

LayoutPanelMarkup.prototype.getFullScreenBtnMarkup = function(){
  var retVal = new StringBuffer();
  retVal.append('<div style="display:none;" id="'+this.options.idBtnFullscreen+'" class="btn-fullscreen '+this.options.classLayoutButton+'" >');
  retVal.append('<i style="top:0.5em;left:0.6em;" class="fa fa-expand"></i>');
  retVal.append('</div>');
  return retVal.toString();
};

LayoutPanelMarkup.prototype.getSaveConfigBtnMarkup = function(){
  var retVal = new StringBuffer();
  retVal.append('<div style="display:none;" id="'+this.options.idBtnSaveConfig+'" class="btn-save '+this.options.classLayoutButton+'" >');
  retVal.append('<i style="top:0.5em;left:0.6em;" class="fa fa-save"></i>');
  retVal.append('</div>');
  return retVal.toString();
};

module.exports = LayoutPanelMarkup;
