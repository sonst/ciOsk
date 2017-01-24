/**
 *  The good ol` StringBuffer is used to concatenate strings in a performant manner.
 *  This is some kind of adaption of a StringBuilder utilizing the power
 *  of array join to prevent continous copying of immutable objects while appending.
 */
var StringBuffer = function() {
  this.clear();
};

/**
 *  This function will append a new String to this StringBuffer instance
 *  @param  s  -  The desired String to append
 */
StringBuffer.prototype.append = function(s){
  this.buffer[this.index] = s;
  this.index += 1;
  return this;
 };

/**
 *  This function will finally concatenate the string array
 *  to a single string. This function will implicitely called by the execution
 *  environment.
 *  Plz be aware that since the 5th Edition of ECMAScript all toString functions
 *  called on uninitialized objects will return 'undefined' which formerly had been 'null'
 *  @return  The concatenated String
 */
StringBuffer.prototype.toString = function() {
  return this.buffer.join('');
}


/**
 *  This function will concatenate the buffered strings using the given delimiter
 *  @return  The concatenated String
 */
StringBuffer.prototype.join = function(delimiter){
  return this.buffer.join(delimiter);
};


/**
 *  This function will clear the underlying buffer
 */
StringBuffer.prototype.clear = function(){
  this.buffer = [];
  this.index = 0;
};


module.exports = StringBuffer;
