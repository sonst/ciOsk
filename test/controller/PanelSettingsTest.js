// init jsdom and environment
require('../testUtils/jsDomBaseline');

var describe            = require('mocha').describe,
    it                  = require('mocha').it,
    expect              = require('chai').expect,
    beforeEach          = require('mocha').beforeEach,
    $                   = require('jquery'),
    Action              = require('../../src/util/Action'),
    ActionListener      = require('../../src/util/ActionListener'),
    PanelSettingsAction = require('../../src/view/PanelSettingsAction'),
    PanelSettingsMarkup = require('../../src/view/PanelSettingsMarkup'),
    PanelSettings       = require('../../src/controller/PanelSettings');

describe('The PanelSettings', function () {

  describe('↳ object',function(){
    var panelSettings;

    beforeEach(function () {
      panelSettings = new PanelSettings();
    });

    afterEach(function(){
      panelSettings.removePanelSettings();
    });

    it('gets instanciated correctly', function(){
        expect(panelSettings.constructor.super_).to.equal(ActionListener);
    });

    it('contains the aggregated objects of the correct type', function(){
      expect(PanelSettingsMarkup.prototype.isPrototypeOf(panelSettings.markup));
      expect(PanelSettingsAction.prototype.isPrototypeOf(panelSettings.actions));
      expect(panelSettings.actions.constructor.super_).to.equal(Action);
    });

    it('subscribes it`s actionListener to the PanelSettingsAction', function(){
      expect(panelSettings.actions.hasSubscriptions()).to.equal(true);
    });

  });

  describe('↳ DOM',function(){
    var panelSettings;

    beforeEach(function () {
      panelSettings = new PanelSettings();
    });

    afterEach(function(){
      panelSettings.removePanelSettings();
    });

    it('shows the Dialog after creation', function(){
      expect(panelSettings.element.length).to.equal(1);
      expect(panelSettings.element.css('display')).to.not.equal('none');
    });

    it('hides the Dialog, clicking cancel', function(){
      var cancelBtn = panelSettings.element.find('.btn-cancel');
      cancelBtn.trigger('click.cancel.panelSettings');
      expect(panelSettings.element).to.equal(null);
      expect(panelSettings.actions.hasSubscriptions()).to.equal(false);
      expect($('.panel-settings').length).to.equal(0);
      expect($('.panel-blocked').length).to.equal(0);
      expect($('.settings-opened').length).to.equal(0);
    });

    it('hides the Dialog, clicking ok', function(){
      var okBtn = panelSettings.element.find('.btn-ok');
      okBtn.trigger('click.ok.panelSettings');
      expect(panelSettings.element).to.equal(null);
      expect(panelSettings.actions.hasSubscriptions()).to.equal(false);
      expect($('.panel-settings').length).to.equal(0);
      expect($('.panel-blocked').length).to.equal(0);
      expect($('.settings-opened').length).to.equal(0);
    });

    it('invokes addPanelContent and removePanelSettings, clicking ok', function(){
      var calledFunction = [],
          functionArgs   = [],
          url            = 'http://www.derbauer.de',
          okBtn          = panelSettings.element.find('.btn-ok');
      panelSettings.actions.invoke = function(name, args){
        calledFunction.push(name);
        functionArgs.push(args);
      };

      $('#inpSttng_0').val(url);
      okBtn.trigger('click.ok.panelSettings');

      expect(calledFunction.length).to.equal(2);
      expect(calledFunction).to.contain('removePanelSettings');
      expect(calledFunction).to.contain('addPanelContent');
      expect(functionArgs).to.contain(url);
    });
  });



});
