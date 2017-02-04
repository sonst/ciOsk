var PanelSettingsAction = require('../view/PanelSettingsAction');
var PanelSettingsMarkup = require('../view/PanelSettingsMarkup');
var ActionListener      = require('./ActionListener');
var $                   = require('jquery');

/**
 *  @constructor
 *  @augments ActionListener
 */
var PanelSettings = function(){

  PanelSettings.super_.apply(this);

  var instance = this,
      container = null;

  this.element = null,
  this.markup = null,
  this.actions = null;

  var init = function(){
    container = $('body');
    container.find('.panel-container.ui-active').addClass('settings-opened');
    container.find('.panel-container:not(.settings-opened) .panel-content').addClass('panel-blocked');

    initDOM();
    initActions();
  };

  var initDOM = function(){
    instance.markup = new PanelSettingsMarkup();
    container.prepend(instance.markup.getContainer());
    instance.element = container.find('.panel-settings');
    instance.element.fadeIn();
  };

  var initActions = function(){
    instance.actions = new PanelSettingsAction();
    //instance.actions.initEvents();
    instance.subscribeAction(instance, instance.actions);
    instance.actions.initEvents();
  };

  this.removePanelSettings = function(){
    if(!instance.element)
      return;

    instance.element.find('*').off();
    instance.element.fadeOut(function(){
      $(this).remove();
      instance.element = null;
    });
    $('.panel-blocked').removeClass('panel-blocked');
    $('.settings-opened').removeClass('settings-opened');
    container = null;
    instance.actions.unsubscribeAll();
  };

  init();

}

PanelSettings.super_= ActionListener;


module.exports = PanelSettings;
