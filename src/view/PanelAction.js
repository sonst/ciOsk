var PanelSplitType = require('../util/PanelSplitType');
var PanelMarkup    = require('./PanelMarkup');
var $              = require('jquery');

var PanelAction = function(panelInstance, options){

  var instance       = this,
      panelMarkup    = new PanelMarkup(),
      mouseOverPanel = false;

  var options = options || {
    classBtn:                'panel-ctxt-btn ',
    classBtnExpand:          'btn-panel-expand ',
    classBtnResize:          'btn-panel-resize',
    classBtnAddContent:      'btn-panel-add',
    classBtnSplitContentH:   'btn-panel-split-horizontal',
    classBtnSplitContentV:   'btn-panel-split-vertical',
    classBtnRemove:          'btn-panel-remove',
    eventClick:              'click.panelActions',
    classPanelLeft:          'panel-left',
    classPanelTop:           'panel-top',
  };

  this.removeEvents = function(){
    detachContextMenuEvents();
  };

  var detachContextMenuEvents = function(){
    panelInstance.getPanelElement().off('mouseover.panel');
    panelInstance.getPanelElement().off('mouseleave.panel');
    detachContextBtnEvents();
  };

  var detachContextBtnEvents = function(){
    $('.'+options.classBtn).off();
  };

  this.attachContextMenuEvents = function(){
    detachContextMenuEvents();

    panelInstance.getPanelElement().on('mouseenter.panel', function(e, immediate){
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

  var attachContextBtnEvents = function(){
    attachSplitContentEvents();
    attachAddContentEvents();
    attachRemoveContentEvents();
  };

  var attachAddContentEvents = function(){
    panelInstance.getPanelElement().find('.'+options.classBtnAddContent).off(options.eventClick).on(options.eventClick, function(){
      new PanelSettings(panelInstance);
    });
  };

  var attachRemoveContentEvents = function(){
    panelInstance.getPanelElement().find('.'+options.classBtnRemove).off(options.eventClick).on(options.eventClick, function(){
      var $this = $(this);
      panelInstance.remove();
      $this = null;
    });
  };

  var attachSplitContentEvents = function(){
    panelInstance.getPanelElement().find('.'+options.classBtnSplitContentH).off(options.eventClick).on(options.eventClick, function(){
      panelInstance.splitPanel(PanelSplitType.HORIZONTAL);
    });
    panelInstance.getPanelElement().find('.'+options.classBtnSplitContentV).off(options.eventClick).on(options.eventClick, function(){
      panelInstance.splitPanel(PanelSplitType.VERTICAL);
    });
  };

  this.initResizablePanel = function(){
    var panelType = panelInstance.getPanelType(),
        container = panelInstance.getContainer(),
        selector  = panelType == PanelSplitType.VERTICAL ? options.classPanelLeft : options.classPanelTop,
        splitter  = container.find('.splitter').first();

    container.find('.'+selector).first().resizable({
      handleSelector: '#'+panelInstance.getId()+'Splitter',
      resizeHeight: panelType === PanelSplitType.HORIZONTAL,
      resizeWidth: panelType === PanelSplitType.VERTICAL
    });

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
          $panel = panelInstance.getPanelElement();
      $this.addClass('ui-mouse-down');
      $panel.append(panelMarkup.getSplitPanelBlocker());
      $panel.find('.panel-split-blocker').stop().fadeIn('fast');
      $panel.find('.panel-content').addClass('panel-blocked');
      $panel = null;
      $this = null;
    });

    $('body').off('mouseup.panelSplitter').on('mouseup.panelSplitter', function(){
      var $this = $(this);
      if($this.find('.panel-settings').length == 0 ){
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
    var isRootPanel = false;
    mouseOverPanel = true;
    if (panelInstance.getParent()==null){
      isRootPanel = true;
    }
    mouseOverPanel = true;
    if(panelInstance.getPanelElement().find('.panel-context-menu').length == 0){
      panelInstance.getPanelElement().prepend(panelMarkup.getCtxtMenuMarkup(isRootPanel));
      attachContextBtnEvents();

      if(immediate){
        panelInstance.getPanelElement().find('.panel-context-menu').stop(true,true).show();
      } else{
        panelInstance.getPanelElement().find('.panel-context-menu').stop(true,true).fadeIn('fast');
      }
    }
  };

  this.closeCtxtMenu = function(){
      panelInstance.getContainer().find('.panel-context-menu').stop(true).fadeOut('fast',function(){
        var $this = $(this);
          detachContextBtnEvents();
          $this.remove();
        $this = null;
      });
  };

  this.removeCtxtMenu = function(){
    var ctxtMenu = panelInstance.getContainer().find('.panel-context-menu');
    ctxtMenu.hide();
    detachContextBtnEvents();
    ctxtMenu.remove();
  };

  var mondrianify = function(panel){
    var colors = ['red','blue','yellow','black','lightgrey', 'white'];
    var index = Math.floor((Math.random() * 6) );
    panel.css('background-color',colors[index]);
  };
}

module.exports = PanelAction;
