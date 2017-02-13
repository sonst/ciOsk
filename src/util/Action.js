/**
 *@see ActionListener .... I'm very unsure whether this approach is transparent
 *     !! Be aware an invokation of function named 'doSth' will call that function on all
 *        subscribers if the name matches --> TODO !!
 *
 *  unsubscription is a costly operation due to the call of delete
 *  subscribe and unsubscribe not on every iteraction
 */
var Action = function() {

  var observerMap = new Map(),
      instance    = this;

  /**
   *  @param fn {function} - the observerFunction
   *  @param callables {String[]} - the list of callable function names
   */
  this.subscribe = function(fn, callables) {
    observerMap.set(fn, callables);
  };

  /**
   *  @param fn {function} - the observerFunction
   */
  this.unsubscribe = function(fn) {
    observerMap.delete(fn);
  };

  this.unsubscribeAll = function(){
    observerMap = new Map();
  };

  /**
   *  @param name {String}   - the event function name
   *  @param name {Object[]} - the function arguments
   */
  this.invoke = function(name, args){
    instance.fire({
      'name': name,
      'args': args
    });
  };

  /**
   *  @param obj {Object{name{String},args{Object[]}}} - the object containing function name and args
   */
  this.fire = function(obj) {
    observerMap.forEach(function(item, fn){
      item.some(function(fnName){
        if(fnName === obj.name){
          fn.call(instance, obj);
          return true;
        }
      });
    });
  };

  /**
   *  @return {boolean} - whether observers have subscribed to this action
   */
  this.hasSubscriptions = function(){
    return (observerMap.size > 0);
  };

  this.getObserverMap = function(){
    return observerMap;
  };

  this.getCallables = function(handlerFn){
    var retVal = [];
    observerMap.forEach(function(item, fn){
      if(handlerFn === fn){
        item.some(function(fnName){
          retVal.push(fnName);
        });
      }
    });
    return retVal;
  };

}

module.exports = Action;
