var jsdom = require('jsdom');
var path = require('path');
var fs = require('fs');
var mainCss = fs.readFileSync(path.normalize(__dirname + "/../../theme/ciOsk/css/ciOsk.css"), 'utf8');


global.document = jsdom.jsdom('<!DOCTYPE html><html><meta http-equiv="content-type" content="text/html; charset=utf-8"><head></head><body></body></html>', {
        features : {
            FetchExternalResources : ['script', 'css'],
            QuerySelector : true
        }
    });

global.window = document.defaultView;
global.window.jQuery = require('jquery');
global.window.$ = window.jQuery;
global.jQuery = window.jQuery;
global.navigator = {
  userAgent: 'node.js'
};

// append css
var head = document.getElementsByTagName('head')[0];
style = document.createElement("style");
style.type = 'text/css';
style.innerHTML = mainCss;
head.appendChild(style);

require('jquery-ui-dist/jquery-ui');
require('../../src/util/jquery.resizeFlex');
