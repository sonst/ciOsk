'use strict';

/**
 *  Gotta rethink that whole approach
 *  this really is obfuscating....
 *
 */
var ActionListener = function(){

  var instance = this;

  /**
   *  Subscribes the given listener instance as an observer to the given action
   *  exposing all public functions of the listener instance to the action
   *
   *  @param {Object} listenerInstance - The Observer
   *  @param {Action} action - The Action able to invoke calls
   */
  this.subscribeAction = function(listenerInstance, action){
    var publicFunctions = getListOfPublicFunctions(listenerInstance);
    instance = listenerInstance;
    action.subscribe(eventHandler, publicFunctions);
  };

  /**
   *  executes the given function by name providing the args on the given context.
   *  @param {string} functionName - The functions name
   *  @param {object} context - The object the function will be called on.
   *  @param {object[]} args - The arguments passed to the function
   */
  var executeFunctionByName = function(functionName, context, args ) {
    var namespaces = functionName.split('.'),
        func = namespaces.pop();

    for(var i=0, count=namespaces.length; i<count; i++) {
      context = context[namespaces[i]];
    }
    try{
      context[func].apply(context, [args]);
    }catch(e){
      if(typeof context[func] !== 'undefined'){
        console.warn(e);
      } else {
        console.warn(context.constructor.name+'#'+func+' is not defined! Global event subscription can lead to memory leaks...');
      }
    }
  };

  var eventHandler = function(obj){
    executeFunctionByName(obj.name, instance, obj.args);
  };

  var getListOfPublicFunctions = function(obj){
    var retVal = [];
    for(var prop in obj){
      if(obj.hasOwnProperty(prop)){
          if(typeof obj[prop] === 'function') {
              retVal.push(prop);
          }
      }
    }
    return retVal;
  };

};

module.exports = ActionListener;
