var SplashInfoMarkup = require('./SplashInfoMarkup');
var Utils            = require('../util/Utils');
var $                = require('jquery');

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
    .on('splashInfo.show', function(evt, value){
      $(options.selectorElementContainer).append(instance.markup.getSplashInfoMarkup(value));
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


module.exports = SplashInfoAction;
