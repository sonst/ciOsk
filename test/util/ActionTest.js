var Action = require('../../src/util/Action');

var describe       = require('mocha').describe,
    it             = require('mocha').it,
    expect         = require('chai').expect,
    beforeEach     = require('mocha').beforeEach;


describe('The Action', function () {

  describe('↳ subject', function () {

    var action = null,
        callableStub = null;

    beforeEach(function () {
      action = new ActionStub();
      callableStub = new CallableStub()
    });

    afterEach(function () {
      action.unsubscribeAll();
    });

    it('subscribes observers', function(){
      action.subscribe(callableStub.eventHandler, callableStub.callableFunctions);
      expect(action.hasSubscriptions()).to.equal(true);
      expect(action.getObserverMap().has(callableStub.eventHandler)).to.equal(true);
      expect(action.getObserverMap().has(function(par1,par2){return true;})).to.equal(false);
      expect(action.getCallables(callableStub.eventHandler)).to.contain(callableStub.callableFunctions[0]);
      expect(action.getCallables(callableStub.eventHandler)).to.contain(callableStub.callableFunctions[1]);
    });

    it('subscribes multiple observers', function(){
      var callableStubTwo = new CallableStub();
      callableStub.callableFunctions = ['doSth','andMore'];
      action.subscribe(callableStub.eventHandler, callableStub.callableFunctions);
      action.subscribe(callableStubTwo.eventHandler, callableStubTwo.callableFunctions);
      expect(action.hasSubscriptions()).to.equal(true);
      expect(action.getObserverMap().has(callableStub.eventHandler)).to.equal(true);
      expect(action.getObserverMap().has(callableStubTwo.eventHandler)).to.equal(true);
      expect(action.getCallables(callableStubTwo.eventHandler)).to.contain(callableStubTwo.callableFunctions[0]);
      expect(action.getCallables(callableStubTwo.eventHandler)).to.contain(callableStubTwo.callableFunctions[1]);
      expect(action.getCallables(callableStub.eventHandler)).to.not.contain(callableStubTwo.callableFunctions[0]);
      expect(action.getCallables(callableStubTwo.eventHandler)).to.not.contain(callableStub.callableFunctions[1]);
      expect(action.getCallables(callableStub.eventHandler)).to.contain(callableStub.callableFunctions[0]);
      expect(action.getCallables(callableStub.eventHandler)).to.contain(callableStub.callableFunctions[1]);
    });

    it('is able to unsubscribe all observers', function(){
      action.subscribe(callableStub.eventHandler, callableStub.callableFunctions);
      action.unsubscribeAll();
      action.callTheCops();
      expect(action.hasSubscriptions()).to.equal(false);
      expect(callableStub.handlerCalled).to.equal(false);
    });

    it('is able to unsubscribe certain observers', function(){
      action.subscribe(callableStub.eventHandler, callableStub.callableFunctions);
      action.unsubscribe(callableStub.eventHandler);
      action.callTheCops();
      expect(action.getObserverMap().has(callableStub.eventHandler)).to.equal(false);
      expect(action.hasSubscriptions()).to.equal(false);
      expect(callableStub.handlerCalled).to.equal(false);
    });

    it('invokes subscribed observers', function(){
      action.subscribe(callableStub.eventHandler, callableStub.callableFunctions);
      action.callTheCops();
      expect(callableStub.handlerCalled).to.equal(true);
      expect(callableStub.callableFunctions).to.contain(callableStub.handlerCalledWith.name);
      expect(callableStub.handlerCalledWith.args).to.contain('1');
      expect(callableStub.handlerCalledWith.args).to.contain(2);
      expect(callableStub.handlerCalledWith.args).to.contain(true);
    });

  });


});


var CallableStub = function(){
  var instance = this;

  this.callableFunctions = ['plzCall911','fnOne'];
  this.handlerCalled     = false;
  this.handlerCalledWith = {};

  this.eventHandler = function(args){
    instance.handlerCalled = true;
    instance.handlerCalledWith = args;
  };
};


var ActionStub = function(){
  ActionStub.super_.apply(this);

  var instance = this;
  this.args = ['1', 2, true];

  this.callTheCops = function(){
    instance.invoke('plzCall911', instance.args);
  };
}
ActionStub.super_= Action;

