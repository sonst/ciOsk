require('../testUtils/JsDomUtil');
var describe       = require('mocha').describe,
    it             = require('mocha').it,
    expect         = require('chai').expect,
    beforeEach     = require('mocha').beforeEach,
    $              = require('jquery'),
    Action         = require('../../src/util/Action'),
    ActionListener = require('../../src/util/ActionListener'),
    PanelSplitType = require('../../src/util/PanelSplitType'),
    LayoutPanel    = require('../../src/controller/LayoutPanel'),
    Panel          = require('../../src/controller/Panel'),
    PanelDriver      = require('../testUtils/PanelDriver');
    PanelMarkup    = require('../../src/view/PanelMarkup'),
    PanelContent   = require('../../src/controller/PanelContent'),
    PanelAction    = require('../../src/view/PanelAction');


describe('The Panel', function () {

  describe('↳ object', function(){

    var util = null,
        panel;

    beforeEach(function() {
      util = new PanelDriver();
      panel = util.getPanel();
    });

    afterEach(function(){
      util.getPanel().remove();
      util.getLayoutPanel().destroy();
    });

    it('does get instanciated correctly', function(){
      expect(panel.constructor.super_).to.equal(ActionListener);
      expect(panel.getId()).to.equal(util.getPanelId());
      expect(panel.getPanelType()).to.equal(PanelSplitType.NONE);
      expect(panel.isRootPanel()).to.equal(true);
    });

    it('contains the aggregated objects of the correct type', function(){
      expect(PanelAction.prototype.isPrototypeOf(panel.panelAction)).to.equal(true);
      expect(panel.panelAction.constructor.super_).to.equal(Action);
      expect(PanelMarkup.prototype.isPrototypeOf(panel.panelMarkup)).to.equal(true);
      expect(panel.panelContent).to.equal(null);
    });

    it('attaches it`s DOM element to the container`s DOM element ', function () {
      expect(panel.getElement()).to.not.be.an('undefined');
      expect(panel.getElement().attr('class'))
      .to.contain(panel.panelMarkup.options.classPanelContainer);
      expect(panel.getElement().attr('id'))
      .to.equal(util.getPanelId());
    });

    it('is able to split the panel horizontally',function(){
      panel.splitPanel(PanelSplitType.HORIZONTAL);
      expect(panel.hasChildren()).to.equal(true);
      expect(panel.getChildren()[0].getPanelType()).to.equal(PanelSplitType.NONE);
      expect(panel.getChildren()[1].getPanelType()).to.equal(PanelSplitType.NONE);
      expect(panel.getPanelType()).to.equal(PanelSplitType.HORIZONTAL);
    });

    it('is able to split the panel vertically',function(){
      panel.splitPanel(PanelSplitType.VERTICAL);
      expect(panel.hasChildren()).to.equal(true);
      expect(panel.getChildren()[0].getPanelType()).to.equal(PanelSplitType.NONE);
      expect(panel.getChildren()[1].getPanelType()).to.equal(PanelSplitType.NONE);
    });

    it('returns the panel`s child calling getChild',function(){
      panel.splitPanel(PanelSplitType.VERTICAL);
      var childA = panel.getChild(panel.getChildren()[0]);
      var childB = panel.getChild(panel.getChildren()[1]);
      expect(childA.getId()).to.equal(panel.getChildren()[0].getId());
      expect(childB.getId()).to.equal(panel.getChildren()[1].getId());
    });

    it('returns the panel`s sibling calling getSibling',function(){
      panel.splitPanel(PanelSplitType.VERTICAL);
      var childB = panel.getSibling(panel.getChildren()[0]);
      var childA = panel.getSibling(panel.getChildren()[1]);
      expect(panel.getChildren()[1].getId()).to.equal(childB.getId());
      expect(panel.getChildren()[0].getId()).to.equal(childA.getId());
    });

    it('removes the child', function(){
      panel.splitPanel(PanelSplitType.HORIZONTAL);
      panel.removeChild(panel.getChildren()[0]);
      expect(panel.hasChildren()).to.equal(false);
    });

  });

  describe('↳ DOM', function(){

    var util = null,
        panel;

    beforeEach(function () {
      util = new PanelDriver();
      panel = util.getPanel();
    });

    afterEach(function(){
      util.getPanel().remove();
      util.getLayoutPanel().destroy();
    });

    it('returns its DOM element, calling the objects function getElement',function(){
      expect(panel.getElement()).to.not.be.an('undefined');
      expect(panel.getElement().attr('id')).to.equal(util.getPanelId());
    });

    it('removes the children on call of remove a child', function(){
      panel.splitPanel(PanelSplitType.HORIZONTAL);
      var childOneId = panel.getChildren()[0].getElement().attr('id');
      panel.getChildren()[0].remove();
      expect($('#'+childOneId).length).to.equal(0);
    });

    it('creates the DOM representation on vertical split',function(){
      panel.splitPanel(PanelSplitType.VERTICAL);
      expect($('#'+panel.getChildren()[0].getId()).length).to.equal(1);
      expect($('#'+panel.getChildren()[1].getId()).length).to.equal(1);
    });

    it('creates the DOM representation on horizontal split',function(){
      panel.splitPanel(PanelSplitType.HORIZONTAL);
      expect($('#'+panel.getChildren()[0].getId()).length).to.equal(1);
      expect($('#'+panel.getChildren()[1].getId()).length).to.equal(1);
    });

  });


  describe('↳ contextMenu',function(){

    var util = null,
        panel;

    beforeEach(function () {
      util = new PanelDriver();
      panel = util.getPanel();
    });

    afterEach(function(){
      util.getPanel().remove();
      util.getLayoutPanel().destroy();
    });

    it('will get opened on mouseenter', function(){
      var panelElement = panel.getElement();
      panelElement.trigger('mouseenter.panel');
      var contextMenu = panelElement.find('.panel-context-menu');
      expect(contextMenu.length).to.equal(1);
    });

    it('will get closed on mouseleave', function(){
      var panelElement = panel.getElement();
      panelElement.trigger('mouseleave.panel');
      var contextMenu = panelElement.find('.panel-context-menu');
      expect(contextMenu.is(':visible')).to.equal(false);
    });

    it('contains three buttons on the base panel', function(){
      var panelElement = panel.getElement();
      panelElement.trigger('mouseenter.panel');
      var contextMenu = panelElement.find('.panel-context-menu');
      var buttons = contextMenu.find('.'+panel.panelMarkup.options.classPanelContextMenuBtn);
      expect(buttons.length).to.equal(3);
    });

    it('contains four buttons on any subsequent split panel', function(){
      panel.splitPanel(PanelSplitType.HORIZONTAL);
      var splitPanels = panel.getChildren();
      splitPanels[0].getElement().trigger('mouseenter.panel');
      var contextMenu = splitPanels[0].getElement().find('.panel-context-menu');
      var buttons = contextMenu.find('.'+panel.panelMarkup.options.classPanelContextMenuBtn);
      expect(buttons.length).to.equal(4);
    });

    it('attaches it`s‚ handlers ..',function(){
      var splitPanels,
          classes,
          contextBtns,
          attachedEvents,
          $this,
          buttonClasses = [
            panel.panelMarkup.options.classBtnRemove,
            panel.panelMarkup.options.classBtnSplitVert,
            panel.panelMarkup.options.classBtnSplitHoriz,
            panel.panelMarkup.options.classBtnAddContent
          ];

      panel.splitPanel(PanelSplitType.HORIZONTAL);
      splitPanels = panel.getChildren();
      splitPanels[0].getElement().trigger('mouseenter.panel');
      contextBtns = splitPanels[0].getElement().find('.'+panel.panelMarkup.options.classPanelContextMenuBtn);
      contextBtns.each(function(){
        $this = $(this);
        classes = $this.attr('class');
        attachedEvents = $._data($this.get(0), 'events');
        expect(attachedEvents.click[0]).to.not.be.an('undefined');
        expect(attachedEvents.click[0].namespace).to.equal('panelActions');
        for(var i=0,count=buttonClasses.length;i<count;i++){
          if(classes.indexOf(buttonClasses[i]) != -1){
            buttonClasses.splice(i,1);
            break;
          }
        }
      });
      expect(buttonClasses.length).to.equal(0);
    });
  });

  describe('↳ PanelContent', function(){

    var util = null,
        panel;

    beforeEach(function () {
      util = new PanelDriver();
      panel = util.getPanel();
    });

    afterEach(function(){
      util.getPanel().remove();
      util.getLayoutPanel().destroy();
    });

    it('can be added',function(){
      var url   = 'http://www.derbauer.de',
          frame = null;
      panel.addPanelContent(url);
      frame = panel.getElement().find('iframe');
      expect(PanelContent.prototype.isPrototypeOf(panel.panelContent)).to.equal(true);
      expect(panel.hasPanelContent()).to.equal(true);
      expect(frame.length).to.equal(1);
      expect(frame.attr('src')).to.equal(url);
    });



  });
});
