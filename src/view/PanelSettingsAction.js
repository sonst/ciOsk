var Action = require('../util/Action');
var Utils  = require('../util/Utils');
var $      = require('jquery');

/**
 *  @constructor
 *  @augments Action
 */
var PanelSettingsAction = function(options){

  PanelSettingsAction.super_.apply(this);

  var instance = this;

  var options =  Utils.mergeObjects(options, {
    id:             'panelSettings',
    classContainer: 'panel-settings',
    classDialog:    'panel-settings-diag',
    classBtn:       'panel-settings-btn',
    classFooter:    'panel-settings-footer',
    classContent:   'settings-content',
    classBtnOk:     'btn-ok',
    classBtnCancel: 'btn-cancel',
    classBtnAdd:    'btn-add',
    classInputUrl:  'input-url'
  });

  this.initEvents = function(){
    initState();
    initBtnEvents();
  };

  this.removeEvents = function(){
    var panel = getElement();
    panel.find('.'+options.classBtnOk).off();
    panel.find('.'+options.classBtnCancel).off();
  };

  var initState = function(){
    $('.'+options.classInputUrl).first().attr('placeholder', 'http://');
    $('.'+options.classInputUrl).first().focus();
  };

  var initBtnEvents = function(){
    var buttonOk = null,
        buttonCancel = null,
        btnAdd = null;
    buttonOk = getElement().find('.'+options.classBtnOk);
    buttonCancel = getElement().find('.'+options.classBtnCancel);
    btnAdd = getElement().find('.'+options.classBtnAdd);

    buttonOk.off('click.ok.panelSettings').on('click.ok.panelSettings', function(){
      var url = getElement().find('.'+options.classInputUrl).val();
      instance.invoke('addPanelContent',url);
      instance.invoke('removePanelSettings');
    });
    buttonCancel.off('click.cancel.panelSettings').on('click.cancel.panelSettings', function(){
      instance.invoke('removePanelSettings');
    });
    btnAdd.off('click.add.panelSettings').on('click.add.panelSettings', function(){
      instance.invoke('addPanelContentUrl');
    });
  };

  var getElement = function(){
    return $('#'+options.id);
  };
}

PanelSettingsAction.super_= Action;

module.exports = PanelSettingsAction;
