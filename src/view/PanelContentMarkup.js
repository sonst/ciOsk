var StringBuffer = require('../util/StringBuffer');
var Utils        = require('../util/Utils');

var PanelContentMarkup = function(options) {
  this.options = Utils.mergeObjects(options, {
    classPanelMarkup: 'panel-content',
    classSlideContainer: 'slide-container',
    classWebContent: 'web-content'
  });
}

PanelContentMarkup.prototype.getWebFrame = function(url, inline){
  var classAddition = this.options.classPanelMarkup;
  if(inline){
   classAddition += ' '+this.options.webContent
  }
  var retVal = new StringBuffer();
  retVal.append('<iframe class="'+classAddition+'" frameborder="0" src="'+url+'">') ;
  retVal.append('</iframe>');
  return retVal.toString();
};

PanelContentMarkup.prototype.getSlideContainer = function(arr_urls){
  var retVal = new StringBuffer();
  retVal.append('<div class="'+this.options.classPanelMarkup+' '+this.classSlideContainer+'">');
  for(var i=0,count=arr_urls.length;i<count;i++){
    retVal.append(this.getWebFrame(arr_urls[i],true));
  }
  retVal.append('</div>');
  return retVal.toString();
};

module.exports = PanelContentMarkup;
