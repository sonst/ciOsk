// init jsdom and environment
require('../testUtils/jsDomBaseline');

var describe            = require('mocha').describe,
    it                  = require('mocha').it,
    expect              = require('chai').expect,
    beforeEach          = require('mocha').beforeEach,
    $                   = require('jquery'),

    ActionListener      = require('../../src/controller/ActionListener');
    Action              = require('../../src/view/Action');
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


  });



});
