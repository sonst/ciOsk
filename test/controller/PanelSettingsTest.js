require('../testUtils/jsDomBaseline');

var describe            = require('mocha').describe,
    it                  = require('mocha').it,
    expect              = require('chai').expect,
    beforeEach          = require('mocha').beforeEach,
    afterEach           = require('mocha').afterEach,
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
      // gotta clear manual though the async transition on removeal takes too long
      $('.panel-settings').remove();
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
      var url = 'http://derbauer.de';
      panelSettings = new PanelSettings(url);
    });

    afterEach(function(){
      // gotta clear manual though the async transition on removeal takes too long
      $('.panel-settings').remove();
    });

    it('shows the Dialog after creation', function(){
      expect(panelSettings.element.length).to.equal(1);
      expect(panelSettings.element.css('display')).to.not.equal('none');
    });

    it('invokes removePanelSettings, clicking cancel', function(){
      var cancelBtn = panelSettings.element.find('.btn-cancel');
      var removePanelSettingsCalled = false;
      panelSettings.removePanelSettings = function(){
        removePanelSettingsCalled = true;
      };
      cancelBtn.trigger('click.cancel.panelSettings');
      expect(removePanelSettingsCalled).to.equal(true);
    });

    it('invokes removePanelSettings, clicking confirm', function(){
      var confirmBtn = panelSettings.element.find('.btn-ok');
      var removePanelSettingsCalled = false;

      panelSettings.removePanelSettings = function(){
        removePanelSettingsCalled = true;
      };

      confirmBtn.trigger('click.ok.panelSettings');
      expect(removePanelSettingsCalled).to.equal(true);
    });

    it('hides the Dialog, calling removePanelSettings', function(){
      panelSettings.removePanelSettings( function(){
        expect(panelSettings.element).to.equal(null);
        expect(panelSettings.actions.hasSubscriptions()).to.equal(false);
        expect($('.panel-settings').length).to.equal(0);
        expect($('.panel-blocked').length).to.equal(0);
        expect($('.settings-opened').length).to.equal(0);
      });
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

    it('contains at least one input url field', function(){
      expect(panelSettings.element.find('.input-url').length).to.be.above(0);
    });

    it('contains the add btn beside an url input', function(){
      var addBtnCount = panelSettings.element.find('.btn-add').length;
      var inputUrlCount = panelSettings.element.find('.input-url').length;
      expect(addBtnCount).to.be.above(0);
      expect(addBtnCount).to.be.equal(inputUrlCount);
    });

    xit('attaches a new input field on clicking add url', function(){
      var addBtn = panelSettings.element.find('btn-add');
      addBtn.trigger('click.add.panelSettings');
      expect(panelSettings.element.find('.input-url').length).to.equal(2);
      expect(panelSettings.element.find('.btn-add').length).to.equal(2);
    });

  });

});
