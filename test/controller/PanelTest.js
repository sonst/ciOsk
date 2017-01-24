require('../testUtils/jsDomBaseline');
var describe       = require('mocha').describe,
    it             = require('mocha').it,
    expect         = require('chai').expect,
    beforeEach     = require('mocha').beforeEach,
    $              = require('jquery'),
    LayoutPanel    = require('../../src/controller/LayoutPanel'),
    Panel          = require('../../src/controller/Panel'),
    PanelSplitType = require('../../src/util/PanelSplitType'),
    PanelMarkup    = require('../../src/view/PanelMarkup');



describe('The Panel', function () {

  var panel,
      panelId = 'a',
      layoutPnl,
      panelMarkupOptions,
      options;

  beforeEach(function () {
    options = {
      classPanelLeft:          'panel-left',
      classPanelRight:         'panel-right',
      classPanelTop:           'panel-top',
      classPanelBottom:        'panel-bottom',
      classSplitterVertical:   'splitter-vertical',
      classSplitterHorizontal: 'splitter-horizontal',
      eventHideCursor:         'hideCursorEvent.panelLayout',
      eventShowCursor:         'showCursorEvent.panelLayout'
    };

    var layoutPanelOptions = {
        uiContent:              true,
        idLayout:               'pageLayout',
        idBtnFullscreen:        'layoutBtnFs',
        classActive:            'ui-active',
        classLayout:            'page-layout-container',
        classLayoutUIContainer: 'layout-ui-container',
        classLayoutButton:      'layout-btn',
        classLayoutLogo:        'layout-logo'
    };

    panelMarkupOptions = new PanelMarkup().options;

    layoutPnl = new LayoutPanel('body',layoutPanelOptions);
    panel = new Panel(panelId, PanelSplitType.NONE);
    panel.setContainer($('#pageLayout'));
    panel.init();
  });

  afterEach(function(){
    panel.remove();
    layoutPnl.destroy();
  });

  it('does get instanciated correctly', function(){
    expect(panel.getId()).to.equal(panelId);
    expect(panel.getPanelType()).to.equal(PanelSplitType.NONE);
    expect(panel.isRootPanel()).to.equal(true);
    expect(panel.isRootPanel()).to.equal(true);
  });

  it('returns its DOM element, calling getElement',function(){
    expect(panel.getElement()).to.not.be.an('undefined');
    expect(panel.getElement().attr('id')).to.equal(panelId);
  });

  it('does get attached to the pageLayout container', function () {
    expect(panel.getElement()).to.not.be.an('undefined');
    expect(panel.getElement().attr('class'))
          .to.contain(panelMarkupOptions.classPanelContainer);
    expect(panel.getElement().attr('id')).to.equal(panelId);
    panel.splitPanel(PanelSplitType.VERTICAL);
  });

  it('is able to split the panel horizontally',function(){
    var layoutBaseElem = $('#pageLayout'),
        panelBaseElement,
        panelElements,
        panelLeft,
        panelRight;
    panel.splitPanel(PanelSplitType.VERTICAL);
    panelBaseElement = layoutBaseElem.find('#'+panel.getId());
    panelElements = panelBaseElement.find('.panel').not('.panel-content');
    panelLeft = panelElements.filter('.'+options.classPanelLeft);
    panelRight = panelElements.filter('.'+options.classPanelRight);
    expect(panelLeft).to.not.be.an('undefined');
    expect(panelRight).to.not.be.an('undefined');
    expect(panelLeft.attr('class')).to.contain('resizeFlex');
  });



  it('is able to split the panel vertically',function(){
    panel.splitPanel(PanelSplitType.VERTICAL);

    expect(panel.hasChildren()).to.equal(true);
    expect(panel.getChildren()[0].getPanelType()).to.equal(PanelSplitType.NONE);
    expect(panel.getChildren()[1].getPanelType()).to.equal(PanelSplitType.NONE);
  });

  it('opens the context menu on mouseenter', function(){
    var panelElement = panel.getElement();
    panelElement.trigger('mouseenter.panel');
    var contextMenu = panelElement.find('.panel-context-menu');
    expect(contextMenu.is(':visible')).to.equal(true);
  });

  it('closes the context menu on mouseleave', function(){
    var panelElement = panel.getElement();
    panelElement.trigger('mouseleave.panel');
    var contextMenu = panelElement.find('.panel-context-menu');
    expect(contextMenu.is(':visible')).to.equal(false);
  });

  it('contains a context menu including the three button on the base panel', function(){
    var panelElement = panel.getElement();
    panelElement.trigger('mouseenter.panel');
    var contextMenu = panelElement.find('.panel-context-menu');
    var buttons = contextMenu.find('.'+panelMarkupOptions.classPanelContextMenuBtn);
    expect(buttons.length).to.equal(3);
  });

  it('contains a context menu including four button on any subsequent split panel', function(){
    panel.splitPanel(PanelSplitType.HORIZONTAL);
    var splitPanels = panel.getChildren();
    splitPanels[0].getElement().trigger('mouseenter.panel');
    var contextMenu = splitPanels[0].getElement().find('.panel-context-menu');
    var buttons = contextMenu.find('.'+panelMarkupOptions.classPanelContextMenuBtn);
    expect(buttons.length).to.equal(4);
  });

  it('attaches the contextMenus event handlers ..',function(){
    var splitPanels,
        classes,
        contextBtns,
        attachedEvents,
        $this,
        buttonClasses = [
          panelMarkupOptions.classBtnRemove,
          panelMarkupOptions.classBtnSplitVert,
          panelMarkupOptions.classBtnSplitHoriz,
          panelMarkupOptions.classBtnAddContent
        ];
    panel.splitPanel(PanelSplitType.HORIZONTAL);
    splitPanels = panel.getChildren();
    splitPanels[0].getElement().trigger('mouseenter.panel');
    contextBtns = splitPanels[0].getElement().find('.'+panelMarkupOptions.classPanelContextMenuBtn);
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

  /*it('DOM and events will get removed on call of remove', function(){

    console.log('###############################################');


    panel.splitPanel(PanelSplitType.HORIZONTAL);



    console.log(panel.getChildren()[0].getElement());
    console.log(panel.getChildren()[1].getElement());


    panel.getChildren()[0].remove();

    console.log(panel.getChildren()[0].getElement());
    console.log(panel.getChildren()[1].getElement());

    console.log(panel.getPanelType());

  });
*/
});
