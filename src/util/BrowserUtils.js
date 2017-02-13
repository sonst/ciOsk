var BrowserUtils = function(){};

BrowserUtils.prototype.suppressBrowsersContextMenuBehaviour = function(){
  $('*').contextmenu( function() {
    return false;
  });
};

BrowserUtils.prototype.detectIE = function() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }
  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }
  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // IE 12 => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
};

BrowserUtils.prototype.domZoomPrevention = function(){
  var ctrlDown = false;
  $(document).on('keydown',function(e){
    ctrlDown = e.ctrlKey;
  }).on('keyup',function(e){
    ctrlDown = e.ctrlKey
  });
  // prevent std browser zoom behaviour
  $('body').bind('DOMMouseScroll mousewheel', function(event){
    if(ctrlDown){
      event.preventDefault();
    }
  });
};

/*
BrowserUtils.prototype.initI18n = function(callback){
  var language_complete;

  if(navigator.appVersion.indexOf("MSIE")!=-1) {
    // and another one :|
    language_complete = window.navigator.userLanguage;
  } else {
    language_complete = navigator.language.split('-');
  }

  i18n.init({ lng: 'de', useDataAttrOptions: true ,debug: true }, function(t) {
     $('title').i18n();
     callback();
  });
}
*/

BrowserUtils.prototype.setLocalStorage = function(key, value){
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem(key, value);
  } else {
    console.warn('no local storage available! You will not be able to store your layout!');
  }
};

BrowserUtils.prototype.getLocalStorage = function(key){
  return localStorage.getItem(key);
};

BrowserUtils.prototype.printHeader = function(){
  var req = new XMLHttpRequest();
  req.open('GET', document.location, false);
  req.send(null);
  var headers = req.getAllResponseHeaders().toLowerCase();
  console.log(headers);
};

module.exports = new BrowserUtils();
