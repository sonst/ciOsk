var ApplicationState = require('../controller/ApplicationState');
var PanelTreeUtils   = require('../util/PanelTreeUtils');
var BrowserUtils     = require('../util/BrowserUtils');
var Utils            = require('../util/Utils');
var $                = require('jquery');

var LayoutPanelAction = function(options){

  var fullscreen = false,
      instance = this;

  options = Utils.mergeObjects(options, {
    uiContent:              true,
    idLayout:               'pageLayout',
    idBtnFullscreen:        'layoutBtnFs',
    idBtnSaveConfig:        'layoutBtnSave',
    classActive:            'ui-active',
    classLayout:            'page-layout-container',
    classLayoutUIContainer: 'layout-ui-container',
    classLayoutButton:      'layout-btn',
    classLayoutLogo:        'layout-logo'
  });


  this.initEvents = function(){
    // though there are document events attached
    instance.removeEvents();
    attachFullscreenEvents();
    attachSaveEvents();
    attachHideCursorEvents();
    attachUiEvents();
  };

  this.removeEvents = function(){
    var uiContainer = getElement().find('.'+options.classLayoutUIContainer);
    detachHideCursorEvent();
    getElement().find('#'+options.idBtnFullscreen).off('click.layout.fullscreen');
    uiContainer.off('mouseover.panelLayout');
    uiContainer.off('mouseleave.panelLayout');
    document.removeEventListener('webkitfullscreenchange',onChangeFullscreenState);
    document.removeEventListener('mozfullscreenchange',onChangeFullscreenState);
    document.removeEventListener('fullscreenchange',onChangeFullscreenState);
    document.removeEventListener('MSFullscreenChange',onChangeFullscreenState);
  };

  var attachSaveEvents = function(){
    getElement().find('#'+options.idBtnSaveConfig).off('click.layout.save').on('click.layout.save',function(){
      instance.onClickSave(this);
    });
  };

  this.onClickSave = function(btn){
    var $this = $(btn);
    var ptUtil = new PanelTreeUtils();
console.log('#### CLICK SAVE!  ####');
    var serialized = ptUtil.serialize(ApplicationState.rootPanel)
    console.log(serialized);
    BrowserUtils.setLocalStorage(ApplicationState.const.KEY_LOCAL_STORAGE, serialized);

    $this = null;
  };

  var attachFullscreenEvents = function(){
    getElement().find('#'+options.idBtnFullscreen).off('click.layout.fullscreen').on('click.layout.fullscreen',function(){
      instance.onClickFullscreenView(this);
    });
    attachFullscreenChangeEvents()
  };

  this.onClickFullscreenView = function(btn){
      var $this = $(btn);
      if($this.hasClass(options.classActive)){
        exitFullscreen();
        $this.removeClass(options.classActive);
        $this.find('.fa').fadeOut(50, function(){
          var $this = $(this);
          $this.removeClass('fa-compress');
          $this.addClass('fa-expand');
          $this.fadeIn(function(){
            $this = null;
          });
        });
      } else {
        $this.addClass('ui-active');
        $this.find('.fa').fadeOut(50, function(){
          var $this = $(this);
          $this.removeClass('fa-expand');
          $this.addClass('fa-compress');
          $this.fadeIn(function(){
            $this = null;
          });
        });
        enterFullscreen();
      }
      $this = null;
  };

  var attachUiEvents = function(){
    var uiContainer = $('.'+options.classLayoutUIContainer);
    uiContainer.off('mouseover.panelLayout');
    uiContainer.off('mouseleave.panelLayout');
    uiContainer.on('mouseover.panelLayout',function(){
      instance.onMouseOverPanel(this);
    }).on('mouseleave.panelLayout',function(){
      instance.onMouseLeavePanel(this);
    });
  };

  this.onMouseOverPanel = function(panel){
    var $this = $(panel);
    var logo = $this.find('.'+options.classLayoutLogo);
    var btns = $this.find('.'+options.classLayoutButton);
    btns.fadeIn();
    logo.fadeOut();
    logo = null;
    btns = null;
    $this = null;
  };

  this.onMouseLeavePanel = function(panel){
    var $this= $(panel);
    var logo = $this.find('.'+options.classLayoutLogo);
    var btns = $this.find('.'+options.classLayoutButton);
    logo.fadeIn();
    btns.fadeOut();
    logo = null;
    btns = null;
    $this = null;
  };

  var attachHideCursorEvents = function(){
    var timer,
        fadeInBuffer = false;
    $(document).on('mousemove.panelLayout',function(){
      if (!fadeInBuffer) {
        if (timer) {
          clearTimeout(timer);
          timer = 0;
        }
        $('.fade-object').fadeIn();
        $('html').css({
          cursor: ''
        });
        $('.page-layout-overlay').fadeOut('fast');

      } else {
        fadeInBuffer = false;
      }
      timer = setTimeout(function () {
        if(fullscreen){
          $('.fade-object').fadeOut()
          $('html').css({
            cursor: 'none'
          });
          $('.page-layout-container').prepend('<div class="page-layout-overlay"></div>');
        }
        fadeInBuffer = true;
      }, 5000)
    });
  };

  var detachHideCursorEvent = function(){
    fullscreen = false;
    $(document).off('mousemove.panelLayout');
  };

  var enterFullscreen = function() {
    var element = document.getElementById(options.idLayout);
    if (element.requestFullScreen) {
      element.requestFullScreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    }
    fullscreen = true;
  };

  var exitFullscreen = function(){
    if (document.exitFullScreen) {
      document.exitFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  };

  var attachFullscreenChangeEvents = function(){
    document.addEventListener('webkitfullscreenchange', onChangeFullscreenState, false);
    document.addEventListener('mozfullscreenchange', onChangeFullscreenState, false);
    document.addEventListener('fullscreenchange', onChangeFullscreenState, false);
    document.addEventListener('MSFullscreenChange', onChangeFullscreenState, false);
  };

  var onChangeFullscreenState = function(){
    if(document.webkitIsFullScreen === false){
      var $fullscreenBtn = $('#'+options.idBtnFullscreen);
      $fullscreenBtn.find('i').switchClass('fa-compress','fa-expand');
      $fullscreenBtn.removeClass(options.classActive);
      fullscreen = false;
      $fullscreenBtn = null;
    }
    if(document.mozFullScreen === false){
      $('#'+options.idBtnFullscreen).find('i').switchClass('fa-compress','fa-expand');
    }
    if(typeof document.msFullscreenElement != 'undefined' && document.msFullscreenElement != null){
      $('#'+options.idBtnFullscreen).find('i').switchClass('fa-compress','fa-expand');
    }
  };

  var getElement = function(){
    return $('#'+options.idLayout);
  };

}

module.exports = LayoutPanelAction;
