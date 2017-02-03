/**
 *@see ActionListener .... I'm very unsure whether this approach is transparent
 */
var Action = function() {

  var observers = [],
      instance = this;

  this.subscribe = function(fn) {
    observers.push(fn);
  };

  this.unsubscribe = function(fn) {
    observers = observers.filter(
      function(item) {
        if (item !== fn) {
          return item;
        }
      }
    );
  };

  this.unsubscribeAll = function(){
    observers = [];
  };

  this.invoke = function(name, args){
    instance.fire({
      'name': name,
      'args': args
    });
  };

  this.fire = function(obj) {
    observers.forEach( function(item) {
      item.call(instance, obj);
    });
  };
}

module.exports = Action;
