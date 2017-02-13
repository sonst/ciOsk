var PanelContentMarkup = require('../view/PanelContentMarkup');
var PanelContentAction = require('../view/PanelContentAction');

var PanelContent = function(parentElement, url){

  var container          = null,
      panelContentMarkup = null,
      panelContentAction = null,
      instance           = this,
      refreshInterval    = null;

  this.init = function(){
    container = parentElement;
    url = url || 'http://www.tv-testbild.com/ganzneu/testbild3.jpg';
    panelContentMarkup = new PanelContentMarkup();
    panelContentAction = new PanelContentAction();
    initDom();
    initActions();
  };

  var initSingleWebFrame = function(url){
    if(container.find('.panel-content').length>0){
      container.find('.panel-content').replaceWith(panelContentMarkup.getWebFrame(url));
    } else {
      container.append(panelContentMarkup.getWebFrame(url));
    }
    var iframe = container.find('.panel-content');
    iframe.addClass('visible');
  };

  var initDom = function(){
    initSingleWebFrame(url);
  }

  var initActions = function(){};

  this.getUrl = function(){
    return url;
  };

  this.getRefreshInterval = function(){
    return refreshInterval;
  };

  instance.init();
}




module.exports = PanelContent;
