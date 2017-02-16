var StringBuffer = require('../util/StringBuffer');
var Utils = require('../util/Utils');
var $ = require('jquery');

var SplashInfo = function(options){

  var instance = this;
  var options = Utils.mergeObjects(options, {
    id: 'splashInfo',
    selectorEventContainer : 'body',
    selectorElementContainer : 'body',
    classSplashInfo : 'splash-info',
    interval : '',
    autoClose: true
  });

  this.markup = null;
  this.actions = null;

  this.init = function(){
    this.actions = new SplashInfoAction(options);
    initActions();
  };

  var initDom = function(){
    instance.markup.getSplashInfoMarkup();
  };

  var initActions = function(){
    instance.actions.init();
  };

  this.remove = function(){
    var container = $('#'+options.id);
    container.off();
    container.remove();
  };
};


var SplashInfoAction = function(options){
  var instance = this;

  this.markup = new SplashInfoMarkup(options);

  this.init = function(){
    if(options.autoClose){
      attachDomEventListener();
    }
  };

  var attachDomEventListener = function(){
    $(options.selectorEventContainer)
    .off('splashInfo.show')
    .on('splashInfo.show', function(evt){
      var info = evt[0];
//      console.log(evt);
      $(options.selectorElementContainer).append(instance.markup.getSplashInfoMarkup(info));
      $('#'+options.id).fadeIn('fast',function(){
        startTimer();
      });
    });
  };

  var startTimer = function(){
    setTimeout(hideSplashInfo, options.interval);
  };

  var hideSplashInfo = function(){
    $('#'+options.id).fadeOut('fast', function(){
      var $this = $(this);
      $this.remove();
      $this = null;
    });
  };

};


var SplashInfoMarkup = function(options){
  this.options = Utils.mergeObjects(options, {
    id: '',
    classContainer : '',
    interval : '',
    autoClose: true
  });
};

SplashInfoMarkup.prototype.getSplashInfoMarkup = function(info){
  var retVal = new StringBuffer();
  console.log(this.options.id);
  retVal.append('<div style="position:absolute; height:100px;width:100px;background-color:grey; border-radius:1em;" id="'+this.options.id+'" class="'+this.options.classSplashInfo+'">');
  retVal.append('<span class="inner-info">');
  retVal.append('<i class="fa fa-send" />');
  retVal.append('</span>');
  retVal.append('</div>');
  return  retVal.toString();
};



module.exports = SplashInfo;
