/**
 *  The good ol` StringBuffer is used to concatenate strings in a performant manner.
 *  This is some kind of adaption of a StringBuilder utilizing the power
 *  of array join to prevent continous copying of immutable objects while appending.
 */
var StringBuffer = function() {
  this.buffer = [];
  this.index = 0;
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

module.exports = StringBuffer;
