var PanelSplitType = require('../util/PanelSplitType');
var PanelMarkup    = require('../view/PanelMarkup');
var PanelAction    = require('../view/PanelAction');
var $              = require('jquery');

var Panel = function(id, splitType, parent){

  var container    = null,
      panelMarkup  = null,
      panelAction  = null,
      panelContent = null,
      panelChildA  = null,
      panelChildB  = null,
      parent       = parent || null,
      instance     = this;

  var options = {
    classPanelLeft:          'panel-left',
    classPanelRight:         'panel-right',
    classPanelTop:           'panel-top',
    classPanelBottom:        'panel-bottom',
    classSplitterVertical:   'splitter-vertical',
    classSplitterHorizontal: 'splitter-horizontal',
    eventHideCursor:         'hideCursorEvent.panelLayout',
    eventShowCursor:         'showCursorEvent.panelLayout'
  };

  this.init = function(container){
    splitType   = splitType ? splitType : PanelSplitType.NONE;
    panelMarkup = new PanelMarkup();
    initDOM();
    initActions();
  };

  var initDOM = function(){
    if(typeof (container) === 'undefined' || container === null){
      throw new ReferenceError('container undefined!');
    }
    container.append(panelMarkup.getPanelContainer(id, splitType));
  };

  var initActions = function(){
    panelAction = new PanelAction(instance);
    if (splitType != PanelSplitType.NONE){
      panelAction.initResizablePanel();
    } else {
      panelAction.attachContextMenuEvents();
    }
  };

  this.addContent = function(markup){
    var panel = instance.getPanelElement()
    if(!panel.hasChild()){
      panel.append(markup);
    }
  };

  this.splitPanel = function(splitPanelType){
    var panelElementA = null,
        panelElementB = null;
    splitType = splitPanelType;
    panelAction.removeEvents();
    panelAction.removeCtxtMenu();

    instance.getPanelElement().replaceWith(panelMarkup.getPanelContainer(id, splitType));

    panelElementA = $('#'+id+'_pnl0');
    panelChildA = new Panel(id + '0', PanelSplitType.NONE, instance);
    panelChildA.setContainer(panelElementA);
    panelChildA.init();

    panelElementB = $('#'+id+'_pnl1');
    panelChildB = new Panel(id + '1', PanelSplitType.NONE, instance);
    panelChildB.setContainer(panelElementB);
    panelChildB.init();

    panelAction.initResizablePanel();
    panelChildA.getPanelElement().trigger('mouseenter.panel', true);

    if(panelContent != null) {
      panelChildA.addPanelContent(panelContent.getUrl());
      panelContent = null;
    }
  };

  this.remove = function(){
    if(parent && parent.hasChild()){
      parent.removeChild(instance);
    }
  };

  this.removeChild = function(pnl){
    var notSelected = null,
        cachedId    = null;

    notSelected = instance.getChild(pnl);

    if(notSelected != null){
      notSelected.getPanelElement().effect('highlight', { color: "#303030" }, 600);
      instance.getPanelElement().replaceWith(notSelected.getPanelElement());
      panelAction.removeEvents();
      cachedId = instance.getId();
      notSelected.setParent(instance.getParent());
      instance = notSelected;

      if(instance.getParent() != null){
        var tmpChildren = instance.getParent().getChildren();
        if(instance.getParent().getChildren()[0].getId() == cachedId){
          tmpChildren[0] = instance;
        }
        if(instance.getParent().getChildren()[1].getId() == cachedId){
          tmpChildren[1] = instance;
        }
        instance.getParent().setChildren(tmpChildren);
      }

      ///////////////////////////////////////////////////////////////////////////////
      // @TODO SOS refactorME: somehow calling the replace fnctn behaves differently
      //      instance.getParent().replaceChild(cachedId, instance);
      ///////////////////////////////////////////////////////////////////////////////

      panelAction = new PanelAction(instance);

    } else {
      throw new Error('removed item has no sibling!');
    }
  };

  this.getId = function(){
    return id;
  };

  this.getPanelElement = function(){
    return $('#'+instance.getId());
  };

  this.hasPanelContent = function(){
    return panelContent != null;
  };

  this.addPanelContent = function(url){
    if(panelContent != null){

    } else {
      panelContent = new PanelContent(instance.getPanelElement(),url);
    }
  };

  this.setPanelContent = function(pc){
    panelContent = pc;
  };

  this.setPanelType = function(type){
    splitType = type;
  };

  this.getPanelType = function(){
    return splitType;
  };

  this.getParent = function(){
    return parent;
  };

  this.setParent = function(parentPanel){
    parent = parentPanel;
    if(parentPanel != null){
      container = parentPanel.getContainer();
    } else {
      container = instance.getContainer();
    }
  };

  this.getContainer = function(){
    return container;
  };

  this.setContainer = function(containerElement){
    container = containerElement;
  }

  this.hasChildren = function(){
    return panelChildA != null && panelChildB != null;
  };

  this.getChildren = function(){
    return [panelChildA, panelChildB];
  };

  this.getChild = function(pnl){
    var retVal = null;
    if(pnl.getId() === panelChildA.getId()) {
      retVal = panelChildB;
    }
    if(pnl.getId() === panelChildB.getId()) {
      retVal = panelChildA;
    }
    return retVal;
  };

  this.replaceChild = function(id, newPnl){
    if(id === panelChildA.getId()) {
      panelChildB = newPnl;
      return true;
    }
    if(id === panelChildB.getId()) {
      panelChildA = newPnl;
      return true;
    }
    return false;
  };

  this.setChildren = function(children){
    panelChildA = children[0];
    panelChildB = children[1];
  };

}

module.exports = Panel;
