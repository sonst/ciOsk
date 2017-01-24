var jsdom = require('jsdom');

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.window.jQuery = require('jquery');
global.window.$ = window.jQuery;
global.jQuery = window.jQuery;
global.navigator = {
  userAgent: 'node.js'
};

require('jquery-ui-dist/jquery-ui');
require('../../src/util/jquery.resizeFlex');
