var ActionListener = require('../../src/util/ActionListener');
var Action = require('../../src/util/Action');

var describe = require('mocha').describe,
    it = require('mocha').it,
    expect = require('chai').expect,
    beforeEach = require('mocha').beforeEach;


describe('The ActionListener', function () {

    describe('↳ observer', function () {

        var action = null,
            actionListener = null;

        beforeEach(function () {
            actionListener = new ActionListenerStub();
            action = new ActionStub();
        });

        afterEach(function () {
            action.unsubscribeAll();
        });

        it('subscribes a listener Instance to Actions as observers', function () {
            actionListener.subscribeAction(actionListener, action);
            expect(action.hasSubscriptions()).to.equal(true);
            expect(action.getObserverMap().has(function (par1, par2) {
                return true;
            })).to.equal(false);
        });

        it('invokes the listener function on an action call', function () {
            actionListener.subscribeAction(actionListener, action);
            action.callTheCops();
            expect(actionListener.handlerCalled).to.equal(true);
            expect(actionListener.handlerCalledWith).to.contain(action.args[0]);
            expect(actionListener.handlerCalledWith).to.contain(action.args[1]);
            expect(actionListener.handlerCalledWith).to.contain(action.args[2]);
        });

        it('can only get called via exposed functions', function () {
            actionListener.subscribeAction(actionListener, action);
            action.callTheCops();
            action.tryToInvokeNotExposedFunction();
            expect(actionListener.handlerCalled).to.equal(true);
            expect(actionListener.nbdyCallsMeCalled).to.equal(false);
        });

        it('calls only the object instances functions', function () {
            var actionListener2 = new ActionListenerStub();
            actionListener2.subscribeAction(actionListener, action);

            actionListener.subscribeAction(actionListener, action);
            action.callTheCops();
            action.tryToInvokeNotExposedFunction();
            expect(actionListener.handlerCalled).to.equal(true);
            expect(actionListener.nbdyCallsMeCalled).to.equal(false);
        });

    });

});

var ActionListenerStub = function () {
    ActionListenerStub.super_.apply(this);
    var instance = this;
    this.handlerCalled = false;
    this.nbdyCallsMeCalled = false;
    this.handlerCalledWith = [];

    this.plzCall911 = function (args) {
        instance.handlerCalled = true;
        instance.handlerCalledWith = args;
    };
    var nobodyCallsMe = function () {
        instance.nobodyCallsMe = true;
    };
};


ActionListenerStub.super_ = ActionListener;

var ActionStub = function () {
    ActionStub.super_.apply(this);
    var instance = this;
    this.args = ['1', 2, true, {}];

    this.callTheCops = function () {
        instance.invoke('plzCall911', instance.args);
    };

    this.tryToInvokeNotExposedFunction = function () {
        instance.invoke('nobodyCallsMe');
    };
};

ActionStub.super_ = Action;

