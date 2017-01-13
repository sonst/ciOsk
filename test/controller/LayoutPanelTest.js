require('../utils/jsDomBaseline');

var describe    = require('mocha').describe,
    it          = require('mocha').it,
    expect      = require('chai').expect,
    beforeEach  = require('mocha').beforeEach,
    $           = require('jquery'),
    LayoutPanel = require('../../src/controller/LayoutPanel');


describe('The Layout Panel', function () {

  var layoutPnl,
      options;

  beforeEach(function () {
    options = {
      uiContent:              true,
      idLayout:               'pageLayout',
      idBtnFullscreen:        'layoutBtnFs',
      classActive:            'ui-active',
      classLayout:            'page-layout-container',
      classLayoutUIContainer: 'layout-ui-container',
      classLayoutButton:      'layout-btn',
      classLayoutLogo:        'layout-logo'
    };
    layoutPnl = new LayoutPanel('body', options);
  });

  afterEach(function(){
    // destroy the DOM representation
    layoutPnl.destroy();
  });

  it('contains the application`s base element', function () {
    var layoutBaseElem = $('#'+options.idLayout);
    expect(layoutBaseElem).to.not.be.an('undefined');
    expect(layoutBaseElem.length).to.equal(1);
    expect(layoutBaseElem.attr('class')).to.contain(options.classLayout);
  });


  it('shows the application`s ui container', function(){
    var layoutUIElem = $('.'+options.classLayoutUIContainer);
    expect(layoutUIElem).to.not.be.an('undefined');
    expect(layoutUIElem.length).to.equal(1);
  });


  it('has a fullscreen button inside the ui container', function(){
    var layoutUIElem = $('.'+options.classLayoutUIContainer);
    var fsBtn = layoutUIElem.find($('#'+options.idBtnFullscreen));
    var styleClasses = fsBtn.attr('class');
    expect(fsBtn).to.not.be.an('undefined');
    expect(fsBtn.length).to.equal(1);
    expect(styleClasses).to.contain('layout-btn');
  });


  it('attaches the panelLayouts general events', function(){
    var attachedEvents = $._data($(document).get(0), 'events');
    expect(attachedEvents.mousemove).to.not.be.an('undefined');
    expect(attachedEvents.mousemove[0].namespace).to.equal('panelLayout');
  });


  it('attaches the ui container`s events', function(){
    var layoutUIElem = $('.'+options.classLayoutUIContainer);
    var attachedEvents = $._data(layoutUIElem.get(0), 'events');
    expect(attachedEvents.mouseover.length).to.be.above(0);
    expect(attachedEvents.mouseout.length).to.be.above(0);
    expect(attachedEvents.mouseover[0]).to.not.be.an('undefined');
    expect(attachedEvents.mouseout[0]).to.not.be.an('undefined');
    expect(attachedEvents.mouseover[0].namespace).to.equal('panelLayout');
    expect(attachedEvents.mouseout[0].namespace).to.equal('panelLayout');
  });

  it('attaches the fullscreen btn`s events', function(){
    var uiBtn = $('#'+options.idBtnFullscreen);
    var attachedEvents = $._data(uiBtn.get(0), 'events');
    expect(attachedEvents.click.length).to.be.above(0);
    expect(attachedEvents.click[0]).to.not.be.an('undefined');
    expect(attachedEvents.click[0].namespace).to.equal('fullscreen.layout');
  });


  it('triggers the mouseover events', function(){
    var uiContainer = $('.'+options.classLayoutUIContainer);

    // attaching mock vars
    layoutPnl.actions.mouseOverPanelCalled = false;
    layoutPnl.actions.mouseLeavePanelCalled = false;

    layoutPnl.actions.onMouseOverPanel = function(){
      layoutPnl.actions.mouseOverPanelCalled = true;
    };
    uiContainer.trigger('mouseover.panelLayout');
    expect(layoutPnl.actions.mouseOverPanelCalled).to.equal(true);
    expect(layoutPnl.actions.mouseLeavePanelCalled).to.equal(false);

    layoutPnl.actions.mouseOverPanelCalled = false;
    layoutPnl.actions.mouseLeavePanelCalled = false;

    layoutPnl.actions.onMouseLeavePanel = function(){
      layoutPnl.actions.mouseLeavePanelCalled = true;
    };

    uiContainer.trigger('mouseleave.panelLayout');
    expect(layoutPnl.actions.mouseOverPanelCalled).to.equal(false);
    expect(layoutPnl.actions.mouseLeavePanelCalled).to.equal(true);

  });



  it('cannot be generated twice using the same id without throwing an error', function(){
    var exception;
    try{
      new LayoutPanel('body', options);
    }catch(e){
      exception = e;
    }
    expect(exception).not.to.be.an('undefined');
    expect(exception instanceof Error).to.equal(true);
  });

});
