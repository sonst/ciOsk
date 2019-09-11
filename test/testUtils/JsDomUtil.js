'use strict';

var path = require('path'),
    fs = require('fs'),
    lang = 'en-EN';

var jsdom = require('jsdom');
var {JSDOM} = jsdom;
var $;

var JsDomUtil = function () {

    var instance = this,
        translation = null,
        jsdom = {};

    this.init = function () {
        instance.initBrowserLanguage();
        instance.initDom();
        requireOnDomReady();
    };

    var getMarkup = function () {
        return '<!DOCTYPE html><html><meta http-equiv="content-type" content="text/html; charset=utf-8"><head></head><body></body></html>';
    };

    this.getJsDom = function () {
        return jsdom;
    };

    this.initDom = function () {
        jsdom = new JSDOM(getMarkup(), {
            url: 'https://start.emea.vwapps.io/#home',
            referrer: 'https://start.emea.vwapps.io/#home',
            contentType: 'text/html',
            features: {
                FetchExternalResources: ['script', 'css'],
                QuerySelector: true
            },
            includeNodeLocations: true,
            storageQuota: 5000000,
            runScripts: "dangerously"
        });

        const {window} = jsdom;
        const {document} = window;

        global.window = window;
        global.document = document;

        $ = global.jQuery = require('jquery');

        instance.initJQuery();
        instance.initLocalStorage();
    };

    this.initBrowserLanguage = function () {
        global.navigator = {};
        global.navigator.language = lang;
    };

    this.initJQuery = function () {
        global.window.jQuery = require('jquery');
        global.window.$ = window.jQuery;
        global.jQuery = window.jQuery;
    };

    this.initLocalStorage = function () {
        global.window.localStorage = global.window.sessionStorage = {

            getItem: function (key) {
                return this[key];
            },

            setItem: function (key, value) {
                this[key] = value;
            },

            clear: function () {
                for (var attr in this) {
                    if (typeof this[attr] !== 'function') {
                        delete this[attr];
                    }
                }
            },

            removeItem: function (key) {
                for (var attr in this) {
                    if (attr === key) {
                        if (typeof this[attr] !== 'function') {
                            delete this[attr];
                        }
                    }
                }
            }
        };
    };

    this.clearDOM = function () {
        global.window.document.body.innerHTML = '';
    };

    var requireOnDomReady = function () {
        // TODO SOS: let cosumers inject libs !
    };

};

var jsDomUtil = new JsDomUtil();
jsDomUtil.init();

module.exports.jsdom = jsDomUtil.getJsDom();
module.exports.clearDOM = jsDomUtil.clearDOM;
module.exports.init = jsDomUtil.init;