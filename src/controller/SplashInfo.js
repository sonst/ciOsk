var Utils = require('../util/Utils');
var SplashInfoAction = require('../view/SplashInfoAction');
var SplashInfoMarkup = require('../view/SplashInfoMarkup');
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
    this.markup = new SplashInfoMarkup(options);
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




module.exports = SplashInfo;
