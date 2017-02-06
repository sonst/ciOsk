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
   *  @param listenerInstance{Object} - The Observer
   *  @param action{Action} - The Action able to invoke calls
   */
  this.subscribeAction = function(listenerInstance, action){
    var publicFunctions = getListOfPublicFunctions(listenerInstance);
    instance = listenerInstance;
    action.subscribe(eventHandler, publicFunctions);
  };

  /**
   *  executes the given function by name providing the args on the given context.
   *  @param functionName{String} - The functions name
   *  @param context{Object} - The object the function will be called on.
   *  @param args{Object[]} - The arguments passed to the function
   */
  var executeFunctionByName = function(functionName, context, args ) {
    var args = [].slice.call(arguments).splice(2),
        namespaces = functionName.split("."),
        retVal = null,
        func = null;

    func = namespaces.pop();

    for(var i=0, count=namespaces.length; i<count; i++) {
      context = context[namespaces[i]];
    }
    try{
      retVal = context[func].apply(context, args);
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
      if(typeof obj[prop] === "function") {
        retVal.push(prop);
      }
    }
    return retVal;
  };

};

module.exports = ActionListener;
