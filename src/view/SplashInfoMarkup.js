var StringBuffer = require ('../util/StringBuffer');
var Utils        = require('../util/Utils');

var SplashInfoMarkup = function(options){
  this.options = Utils.mergeObjects(options, {
    id: '',
    classContainer : '',
    interval : '',
    autoClose: true
  });
};

SplashInfoMarkup.prototype.getSplashInfoMarkup = function(info, icon){
  var retVal = new StringBuffer();
  retVal.append('<div style="position:absolute; height:100px;width:100px;background-color:grey; border-radius:1em;" id="'+this.options.id+'" class="'+this.options.classSplashInfo+'">');
  retVal.append('<span class="inner-info">')
  retVal.append('<p>'+info+'<p>');
  if(icon)
    retVal.append('<i class="fa fa-'+icon+'" />');
  retVal.append('</span>');
  retVal.append('</div>');
  return  retVal.toString();
};


module.exports = SplashInfoMarkup;
