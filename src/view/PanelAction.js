var PanelMarkup    = require('./PanelMarkup');
var PanelSplitType = require('../util/PanelSplitType');
var Action         = require('../util/Action');
var Utils          = require('../util/Utils');
var flex           = require('../util/jquery.resizeFlex');
var $              = require('jquery');

/**
 *  @constructor
 *  @augments Action
 */
var PanelAction = function(elementId, options){

  PanelAction.super_.apply(this);

  var instance       = this,
      panelMarkup    = new PanelMarkup(),
      mouseOverPanel = false;

  var options = Utils.mergeObjects(options, {
    classBtn:                'panel-ctxt-btn ',
    classBtnExpand:          'btn-panel-expand ',
    classBtnResize:          'btn-panel-resize',
    classBtnAddContent:      'btn-panel-add',
    classBtnSplitContentH:   'btn-panel-split-horizontal',
    classBtnSplitContentV:   'btn-panel-split-vertical',
    classBtnRemove:          'btn-panel-remove',
    eventClick:              'click.panelActions',
    classPanelLeft:          'panel-left',
    classPanelTop:           'panel-top'
  });

  this.removeEvents = function(){
    detachContextMenuEvents();
  };

  this.attachContextMenuEvents = function(){
    detachContextMenuEvents();
    getPanelElement().on('mouseenter.panel', function(e, immediate){
      e.stopPropagation();
      var $this = $(this);
      instance.openCtxtMenu(immediate);
      $this.addClass('ui-active');
      $this = null;
    }).on('mouseleave.panel', function(e){
      var $this = $(this);
      instance.closeCtxtMenu();
      $this.removeClass('ui-active');
      $this = null;
    });
  };

  var attachSplitterHandleEvents = function(splitter){
    splitter.off('mouseover.panel').on('mouseover.panel',function() {
      $(this).find('.splitter-visual-handle').stop().fadeIn(120);
    }).off('mouseleave.panel').on('mouseleave.panel', function() {
      var $this = $(this);
      if(!$this.hasClass('ui-mouse-down')){
        $this.find('.splitter-visual-handle').stop().fadeOut('fast');
      }
      $this = null;
    });
    splitter.off('mousedown.panelSplitter').on('mousedown.panelSplitter', function(){
      var $this = $(this),
          $panel = $this.closest('.panel-container');

      $this.addClass('ui-mouse-down');
      $panel.append(panelMarkup.getSplitPanelBlocker());
      $panel.find('.panel-split-blocker').stop().fadeIn('fast');
      $panel.find('.panel-content').addClass('panel-blocked');
      $panel = null;
      $this = null;
    });
  };

  var attachResizableEvents = function(resizable){
    var resizeWidth  = resizable.attr('class').indexOf('panel-left') !== -1;
    var resizeHeight = resizable.attr('class').indexOf('panel-top') !== -1;
    var splitter     = resizable.siblings('.splitter');
    resizable.resizeFlex({
      handleSelector: '#'+splitter.attr('id'),
      resizeHeight: resizeHeight,
      resizeWidth: resizeWidth
    });
    attachSplitterHandleEvents(splitter);
  };

  this.initResizablePanel = function(){
    var panelsH = $('.panel-left');
    var panelsV = $('.panel-top');

    panelsH.each(function(){
      var $this = $(this);
      attachResizableEvents($this);
      $this = null;
    });
    panelsV.each(function(){
      var $this = $(this);
      attachResizableEvents($this);
      $this = null;
    });

    panelsH = null;
    panelsV = null;

    //
    // FIXME: the event should be attached to the rootPanel !!!
    //
    //
    $('body').off('mouseup.panelSplitter').on('mouseup.panelSplitter', function(){
      var $this = $(this);
      if($this.find('.panel-settings').length === 0 ){
        $this.find('.panel-blocked').removeClass('panel-blocked');
      }
      $this.find('.splitter').removeClass('ui-mouse-down');
      $this.find('.splitter-visual-handle').fadeOut();
      $this.find('.panel-split-blocker').fadeOut('fast',function(){
        $(this).remove();
      });
      $this = null;
    });
  };

  this.openCtxtMenu = function(immediate){
    var isRootPanel = getPanelElement().closest('.panel-container').hasClass('root-panel');
    mouseOverPanel = true;
    if(getPanelElement().find('.panel-context-menu').length === 0){
      getPanelElement().prepend(panelMarkup.getCtxtMenuMarkup(isRootPanel));
      attachContextBtnEvents();
      if(immediate){
        getPanelElement().find('.panel-context-menu').stop(true,true).show();
      } else{
        getPanelElement().find('.panel-context-menu').stop(true,true).fadeIn('fast');
      }
    }
  };

  this.closeCtxtMenu = function(){
    getPanelElement().find('.panel-context-menu').stop(true).fadeOut('fast',function(){
      var $this = $(this);
      detachContextBtnEvents();
      $this.remove();
      $this = null;
    });
  };

  this.removeCtxtMenu = function(){
    var ctxtMenu = getPanelElement().find('.panel-context-menu');
    ctxtMenu.hide();
    detachContextBtnEvents();
    ctxtMenu.remove();
  };

  var detachContextMenuEvents = function(){
    getPanelElement().off('mouseover.panel');
    getPanelElement().off('mouseleave.panel');
    detachContextBtnEvents();
  };

  var detachContextBtnEvents = function(){
    $('.'+options.classBtn).off();
  };

  var attachContextBtnEvents = function(){
    attachSplitContentEvents();
    attachAddContentEvents();
    attachRemoveEvents();
  };

  var attachAddContentEvents = function(){
    getPanelElement().find('.'+options.classBtnAddContent).off(options.eventClick).on(options.eventClick, function(){
      instance.invoke('showSettings');
    });
  };

  var attachRemoveEvents = function(){
    getPanelElement().find('.'+options.classBtnRemove).off(options.eventClick).on(options.eventClick, function(){
      var $this = $(this);
      instance.invoke('remove');
      $this = null;
    });
  };

  var attachSplitContentEvents = function(){
    getPanelElement().find('.'+options.classBtnSplitContentH).off(options.eventClick).on(options.eventClick, function(){
      instance.invoke('splitPanel', PanelSplitType.HORIZONTAL);
    });
    getPanelElement().find('.'+options.classBtnSplitContentV).off(options.eventClick).on(options.eventClick, function(){
      instance.invoke('splitPanel', PanelSplitType.VERTICAL);
    });
  };

  var getPanelElement = function(){
    return $('#'+elementId);
  };

}

PanelAction.super_ = Action;

module.exports = PanelAction;
