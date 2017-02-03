  // init jsdom and environment
require('../testUtils/jsDomBaseline');

var describe            = require('mocha').describe,
    it                  = require('mocha').it,
    expect              = require('chai').expect,
    beforeEach          = require('mocha').beforeEach,
    $                   = require('jquery'),
    PanelSettingsAction = require('../../src/controller/LayoutPanel'),
    PanelSettingsMarkup = require('../../src/view/PanelSettingsMarkup'),
    PanelSettings       = require('../../src/controller/PanelSettings');

describe('The PanelSettings', function () {

  var panelSettings;

  beforeEach(function () {
    panelSettings = new PanelSettings($('body'));
  });

  it('gets instanciated correctly', function(){

    expect(PanelSettingsMarkup.prototype.isPrototypeOf(panelSettings.markup));
    expect(PanelSettingsAction.prototype.isPrototypeOf(panelSettings.actions));

  });

});
