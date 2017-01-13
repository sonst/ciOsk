require('../utils/jsDomBaseline');

var PanelMarkup = require('../../src/view/PanelMarkup');

var describe       = require('mocha').describe,
    it             = require('mocha').it,
    expect         = require('chai').expect,
    beforeEach     = require('mocha').beforeEach,
    $              = require('jquery'),
    LayoutPanel    = require('../../src/controller/LayoutPanel'),
    Panel          = require('../../src/controller/Panel'),
    PanelSplitType = require('../../src/util/PanelSplitType');



describe('The Panel', function () {

  var panel,
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
    panelMarkupOptions = new PanelMarkup().options;

    layoutPnl = new LayoutPanel('body');
    panel = new Panel('a', PanelSplitType.NONE);
    panel.setContainer($('#pageLayout'));
    panel.init();
  });

  afterEach(function(){
    // destroy the DOM representation
    panel.remove();
    layoutPnl.destroy();
  });


  it('does get attached to the pageLayout container', function () {
    var layoutBaseElem = $('#pageLayout');
    var panelElement = layoutBaseElem.find('#'+panel.getId());

    // short expectation of an existing layoutPanel
    expect(layoutBaseElem).to.not.be.an('undefined');
    expect(layoutBaseElem.length).to.equal(1);
    expect(panelElement).to.not.be.an('undefined');
    expect(panelElement.attr('class')).to.contain(panelMarkupOptions.classPanelContainer);
  });

  it('is able to split the panel horizontally',function(){
    var layoutBaseElem = $('#pageLayout');
    var panelElement = layoutBaseElem.find('#'+panel.getId());


  });

  it('is able to split the panel vertically',function(){

  });

  it('attaches any subsequent split to the respective parent panel', function(){
    var layoutBaseElem = $('#pageLayout');
    var panelElement = $('#'+panel.getId());
    var panelMarkupOptions = new PanelMarkup().options;


  });


});
