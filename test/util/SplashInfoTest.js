require('../testUtils/jsDomBaseline');
var describe          = require('mocha').describe,
    it                = require('mocha').it,
    expect            = require('chai').expect,
    beforeEach        = require('mocha').beforeEach,
    $                 = require('jquery'),
    SplashInfo        = require('../../src/controller/SplashInfo');;

var SplashInfo = require('../../src/controller/SplashInfo');


describe('The SplashInfo panel', function(){

  describe('↳ object', function(){

    var splashInfo = null;

    beforeEach(function(){
      splashInfo = new SplashInfo();
      splashInfo.init();
    });

    afterEach(function(){});

    it('will be shown on the respective event', function(){
      $('body').trigger('splashInfo.show');
      expect($('body').find('.splash-info').length).to.equal(1);
    });

  });

});
