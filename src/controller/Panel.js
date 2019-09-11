'use strict';

var PanelSplitType = require('../util/PanelSplitType'),
    PanelMarkup = require('../view/PanelMarkup'),
    PanelAction = require('../view/PanelAction'),
    PanelContent = require('../controller/PanelContent'),
    PanelSettings = require('../controller/PanelSettings'),
    ActionListener = require('../util/ActionListener'),
    $ = require('jquery');

/**
 *  @constructor
 *  @augments ActionListener
 *  @param id {String} - the container id
 *  @param {EnumEntry} splitType  - the split type
 *  @param [parent] {Panel} - The parent panel
 */
var Panel = function (id, splitType, parent) {

    Panel.super_.apply(this);

    var container = null,
        panelChildA = null,
        panelChildB = null,
        parent = parent || null,
        instance = this;

    this.panelMarkup = null;
    this.panelAction = null;
    this.panelContent = null;

    var options = {
        classPanelLeft: 'panel-left',
        classPanelRight: 'panel-right',
        classPanelTop: 'panel-top',
        classPanelBottom: 'panel-bottom',
        classSplitterVertical: 'splitter-vertical',
        classSplitterHorizontal: 'splitter-horizontal',
        eventHideCursor: 'hideCursorEvent.panelLayout',
        eventShowCursor: 'showCursorEvent.panelLayout'
    };

    this.init = function () {
        splitType = splitType ? splitType : PanelSplitType.NONE;
        initDOM();
        initActions();
    };

    var initDOM = function () {
        instance.panelMarkup = new PanelMarkup();
        container.append(instance.panelMarkup.getPanelContainer(instance.getId(), splitType, instance.getParent() === null));
    };

    var initActions = function () {

        instance.panelAction = new PanelAction(instance.getId());
        instance.subscribeAction(instance, instance.panelAction);

        if (!PanelSplitType.NONE.equals(splitType)) {
            // RESIZABLE should not be a panel action!!
            instance.panelAction.initResizablePanel();
        } else {
            instance.panelAction.attachContextMenuEvents();
        }
    };

    var mondrianify = function (panel) {
        var colors = ['red', 'blue', 'yellow', 'black', 'lightgrey', 'white'];
        var index = Math.floor((Math.random() * 6));
        panel.css('background-color', colors[index]);
    };

    this.addContent = function (markup) {
        var panel = instance.getElement();
        if (!panel.hasChildren()) {
            panel.append(markup);
        }
    };

    this.showSettings = function () {
        var url = instance.panelContent ? instance.panelContent.getUrl() : '';
        var settings = new PanelSettings(url);
        instance.subscribeAction(instance, settings.actions);
    };

    var createChildPanelInstance = function (panelId, idAddition) {
        var panel = null;
        panel = new Panel((panelId + idAddition), PanelSplitType.NONE, instance);
        panel.setContainer($('#' + panelId + '_pnl' + idAddition));
        panel.init();
        return panel;
    };

    this.splitPanel = function (splitPanelType) {
        splitType = splitPanelType;
        instance.panelAction.removeEvents();
        instance.panelAction.removeCtxtMenu();
        instance.getElement().replaceWith(instance.panelMarkup.getPanelContainer(instance.getId(), splitType, false));
        panelChildA = createChildPanelInstance(instance.getId(), 0);
        panelChildB = createChildPanelInstance(instance.getId(), 1);
        instance.panelAction.initResizablePanel();
        if (instance.panelContent !== null) {
            panelChildA.addPanelContent(instance.panelContent.getUrl());
            instance.panelContent = null;
        }
    };

    this.remove = function () {
        if (parent !== null && parent.hasChildren()) {
            parent.removeChild(instance);
        }
    };

    var _replaceDOM = function (panel) {

        var newElement = panel.getElement();
        instance.getElement().replaceWith(newElement);
        if (instance.getParent() === null) {
            newElement.addClass('root-panel');
        }
    };

    var _removeChild = function (pnl) {
        var children = instance.getChildren();
        if (children[0] !== null && children[0].getId() === pnl.getId()) {
            panelChildA = null;
        } else if (children[1] !== null && instance.getChildren()[1].getId() === pnl.getId()) {
            panelChildB = null;
        } else {
            throw new Error(pnl + ' is not a child!');
        }
    };

    this.removeChild = function (pnl) {
        var notSelectedChild = null,
            selectedChild = null,
            cachedChildren = [],
            cachedId = null;

        selectedChild = instance.getChild(pnl);
        notSelectedChild = instance.getSibling(pnl);

        selectedChild.panelAction.unsubscribeAll();

        if (notSelectedChild === null) {
            throw new Error('removed item has no sibling!');
        }

        _replaceDOM(notSelectedChild);
        _removeChild(pnl);

        notSelectedChild.setParent(instance.getParent());

        cachedId = instance.getId();
        instance = notSelectedChild;

        if (instance.getParent() !== null) {
            cachedChildren = instance.getParent().getChildren();
            if (instance.getParent().getChildren()[0].getId() === cachedId) {
                cachedChildren[0] = instance;
            }
            if (instance.getParent().getChildren()[1].getId() === cachedId) {
                cachedChildren[1] = instance;
            }
            instance.getParent().setChildren(cachedChildren);
            cachedChildren = [];
        }
    };

    this.getId = function () {
        return id;
    };

    this.getElement = function () {
        return $('#' + instance.getId());
    };

    this.hasPanelContent = function () {
        return instance.panelContent !== null;
    };

    this.addPanelContent = function (url) {
        instance.panelContent = new PanelContent(instance.getElement(), url);
    };

    this.setPanelContent = function (pc) {
        instance.panelContent = pc;
    };

    this.getPanelContent = function () {
        return instance.panelContent;
    };

    this.isRootPanel = function () {
        return instance.getParent() === null;
    };

    this.setPanelType = function (type) {
        splitType = type;
    };

    this.getPanelType = function () {
        return splitType;
    };

    this.getParent = function () {
        return parent;
    };

    this.setParent = function (parentPanel) {
        parent = parentPanel;
        if (parentPanel !== null) {
            container = parentPanel.getContainer();
        } else {
            container = instance.getContainer();
        }
    };

    this.getContainer = function () {
        return container;
    };

    this.setContainer = function (containerElement) {
        container = containerElement;
    };

    this.hasChildren = function () {
        return panelChildA !== null && panelChildB !== null;
    };

    this.getChildren = function () {
        return [panelChildA, panelChildB];
    };

    this.getSibling = function (pnl) {
        if (pnl.getId() === panelChildA.getId()) {
            return panelChildB;
        } else if (pnl.getId() === panelChildB.getId()) {
            return panelChildA;
        }
        return null;
    };

    this.getChild = function (pnl) {
        if (pnl.getId() === panelChildA.getId()) {
            return panelChildA;
        } else if (pnl.getId() === panelChildB.getId()) {
            return panelChildB;
        }
        return null;
    };

    this.setChildren = function (children) {
        panelChildA = children[0];
        panelChildB = children[1];
    };

};

Panel.super_ = ActionListener;

module.exports = Panel;
