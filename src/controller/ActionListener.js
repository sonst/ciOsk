/**
 *  Gotta rethink that whole approach
 *  this really is obfuscating....
 *
 */
var ActionListener = function(){

  var instance = this;

  var executeFunctionByName = function(functionName, context, args ) {
    var args = [].slice.call(arguments).splice(2),
        namespaces = functionName.split("."),
        func = null;

    func = namespaces.pop();
    for(var i=0, count=namespaces.length; i<count; i++) {
      context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
  };

  var eventHandler = function(obj){
    executeFunctionByName(obj.name, instance, obj.args);
  };

  this.subscribeAction = function(listenerInstance, action){
    instance = listenerInstance;
    action.subscribe(eventHandler);
  };

};

module.exports = ActionListener;
