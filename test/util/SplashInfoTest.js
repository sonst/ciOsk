require('../testUtils/jsDomBaseline');
var describe          = require('mocha').describe,
    it                = require('mocha').it,
    expect            = require('chai').expect,
    beforeEach        = require('mocha').beforeEach,
    $                 = require('jquery'),
    SplashInfo        = require('../../src/controller/SplashInfo'),
    SplashInfoAction  = require('../../src/view/SplashInfoAction'),
    SplashInfoMarkup  = require('../../src/view/SplashInfoMarkup');

var options = {
  id: 'splashInfo',
  selectorEventContainer : 'body',
  selectorElementContainer : 'body',
  classSplashInfo : 'splash-info',
  interval : 5000,
  autoClose: true
};


describe('The SplashInfo panel', function(){

  describe('↳ object', function(){

    var splashInfo = null;

    beforeEach(function(){
      splashInfo = new SplashInfo(options);
      splashInfo.init();
    });

    afterEach(function(){
      splashInfo.remove();
    });

    it('Does get instanciated correctly', function(){
      expect(SplashInfoAction.prototype.isPrototypeOf(splashInfo.actions)).to.equal(true);
      expect(SplashInfoMarkup.prototype.isPrototypeOf(splashInfo.actions.markup)).to.equal(true);
      expect(SplashInfoMarkup.prototype.isPrototypeOf(splashInfo.markup)).to.equal(true);
    });

  });


  describe('↳ DOM', function(){
    var splashInfo = null;

    beforeEach(function(){
      splashInfo = new SplashInfo(options);
      splashInfo.init();
    });

    afterEach(function(){
      splashInfo.remove();
    });

    it('will be shown on the respective event', function(){
      $('body').trigger('splashInfo.show');
      expect($('body').find('.splash-info').length).to.equal(1);
    });

    it('will show the caption given inside the triggered event', function(){
      var infoCaption = 'asdfgh';
      $('body').trigger('splashInfo.show', infoCaption);
      expect($('body').find('.splash-info').length).to.equal(1);
      expect($('body').find('.splash-info').find('p').text()).to.equal(infoCaption);
    });

    it('will be shown for the given amount of time', function(){


    });

  });

});
