var PanelContentMarkup = require('../view/PanelContentMarkup');
var PanelContentAction = require('../view/PanelContentAction');

var PanelContent = function(parentElement, url){

  var container          = null,
      panelContentMarkup = null,
      panelContentAction = null,
      instance           = this,
      urls               = [],
      refreshInterval    = null;

  this.init = function(){
    container = parentElement;
    url = url || 'http://www.tv-testbild.com/ganzneu/testbild3.jpg';
    panelContentMarkup = new PanelContentMarkup();
    panelContentAction = new PanelContentAction();
    initDom();
    initActions();
  };

/*  this.addWebFrame = function(urls){
console.log(urls);
    urls.push(urls);
    if(urls.length ==1){
      initSingleWebFrame(urls[0]);
    } else {


      //
      //

    }


  };

  var appendWebFrame = function(url){

  };
*/

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

  instance.init();
}




module.exports = PanelContent;
