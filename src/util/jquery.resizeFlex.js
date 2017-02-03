var $ = require('jquery');
var jQuery = require('jquery');

/*
jquery-resizeFlex
@author sos

adaption of jquery-resizable:

Version 0.17 - 3/31/2016
© 2015 Rick Strahl, West Wind Technologies
www.west-wind.com
Licensed under MIT License
*/

(function (factory) {
  if(typeof module === "object" && typeof module.exports === "object") {
    factory(require("jquery"), window, document);
  } else {
    factory(jQuery, window, document);
  }
}(function($, window, document, undefined) {

  function getHandle(selector, $el) {
    if (selector.trim()[0] === ">") {
      selector = selector.trim().replace(/^>\s*/, "");
      return $el.find(selector);
    }
    return selector ? $(selector) : $el;
  }

  $.fn.resizeFlex = function fnresizeFlex(options) {
    var opt = {
      // selector for handle that starts dragging
      handleSelector: null,
      // resize the width
      resizeWidth: true,
      // resize the height
      resizeHeight: true,
      // the side that the width resizing is relative to
      resizeWidthFrom: 'right',
      // the side that the height resizing is relative to
      resizeHeightFrom: 'bottom',
      // hook into start drag operation (event passed)
      onDragStart: null,
      // hook into stop drag operation (event passed)
      onDragEnd: null,
      // hook into each drag operation (event passed)
      onDrag: null,
      // disable touch-action on $handle
      // prevents browser level actions like forward back gestures
      touchActionNone: true
    };
    if (typeof options == "object") opt = $.extend(opt, options);

    return this.each(function () {
      var startPos, startTransition;

      var $el = $(this);

      var $handle = getHandle(opt.handleSelector, $el);

      if (opt.touchActionNone)
        $handle.css("touch-action", "none");

      $el.addClass("resizeFlex");

      $handle.off('mousedown.rsz touchstart.rsz')
             .on('mousedown.rsz touchstart.rsz', startDragging);

      function noop(e) {
        e.stopPropagation();
        e.preventDefault();
      };

      function startDragging(e) {
        startPos = getMousePos(e);
        startPos.width = parseInt($el.width(), 10);
        startPos.height = parseInt($el.height(), 10);

        startTransition = $el.css("transition");
        $el.css("transition", "none");

        if (opt.onDragStart) {
          if (opt.onDragStart(e, $el, opt) === false)
            return;
        }
        opt.dragFunc = doDrag;

        $(document).on('mousemove.rsz', opt.dragFunc);
        $(document).on('mouseup.rsz', stopDragging);

        if (window.Touch || navigator.maxTouchPoints) {
          $(document).on('touchmove.rsz', opt.dragFunc);
          $(document).on('touchend.rsz', stopDragging);
        }

        $(document).on('selectstart.rsz', noop); // disable selection
      }

      function doDrag(e) {
        var pos = getMousePos(e), newWidth, newHeight;

        if (opt.resizeWidthFrom === 'left')
          newWidth = startPos.width - pos.x + startPos.x;
        else
          newWidth = startPos.width + pos.x - startPos.x;

        if (opt.resizeHeightFrom === 'top')
          newHeight = startPos.height - pos.y + startPos.y;
        else
          newHeight = startPos.height + pos.y - startPos.y;

        if (!opt.onDrag || opt.onDrag(e, $el, newWidth, newHeight, opt) !== false) {
          if (opt.resizeHeight)
            $el.height(newHeight);

          if (opt.resizeWidth)
            $el.width(newWidth);
        }
      }

      function stopDragging(e) {
        e.stopPropagation();
        e.preventDefault();

        $(document).off('mousemove.rsz', opt.dragFunc);
        $(document).off('mouseup.rsz', stopDragging);

        if (window.Touch || navigator.maxTouchPoints) {
          $(document).off('touchmove.rsz', opt.dragFunc);
          $(document).off('touchend.rsz', stopDragging);
        }
        $(document).off('selectstart.rsz', noop);

        // reset changed values
        $el.css("transition", startTransition);

        if (opt.onDragEnd)
          opt.onDragEnd(e, $el, opt);

        return false;
      }

      function getMousePos(e) {
        var pos = { x: 0, y: 0, width: 0, height: 0 };
        if (typeof e.clientX === "number") {
          pos.x = e.clientX;
          pos.y = e.clientY;
        } else if (e.originalEvent.touches) {
          pos.x = e.originalEvent.touches[0].clientX;
          pos.y = e.originalEvent.touches[0].clientY;
        } else
          return null;

        return pos;
      }
    });
  };
}));


