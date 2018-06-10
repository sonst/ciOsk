'use strict';

const PanelSplitType = require('../util/PanelSplitType'),
    StringBuffer = require('../util/StringBuffer'),
    Utils = require('../util/Utils');

/**
 *  The split panel`s panel markup
 *  @param options {object}
 *  @constructor
 */
var PanelMarkup = function (options) {
    this.options = Utils.mergeObjects(options, {
        debug: false,
        idAdditionFirstPanel: '_pnl0',
        idAdditionSecondPanel: '_pnl1',
        classPanelLeft: 'panel-left',
        classPanelRight: 'panel-right',
        classPanelTop: 'panel-top',
        classPanelBottom: 'panel-bottom',
        classSplitter: 'splitter',
        classSplitterVertical: 'splitter-vertical',
        classSplitterHorizontal: 'splitter-horizontal',
        classPanel: 'panel',
        classPanelContainer: 'panel-container',
        classPanelContainerHoriz: 'panel-container-horizontal',
        classPanelContainerVert: 'panel-container-vertical',
        classPanelContextMenu: 'panel-context-menu',
        classPanelContextMenuBtn: 'panel-context-btn',
        classSplitterVisualHandle: 'splitter-visual-handle',
        classSplitPanelBlocker: 'panel-split-blocker',
        classBtnRemove: 'btn-panel-remove',
        classBtnSplitVert: 'btn-panel-split-vertical',
        classBtnSplitHoriz: 'btn-panel-split-horizontal',
        classBtnAddContent: 'btn-panel-add'
    });
};


/**
 *  Returns the panel`s container markup
 *  @param {string} id - The element id
 *  @param {EnumEntry} splitType - The current splitType set
 *  @param {boolean} rootPanel - Whether this will be the root
 *  @return {string} the panel`s markup
 */
PanelMarkup.prototype.getPanelContainer = function (id, splitType, rootPanel) {
    var panelContainerClass = PanelSplitType.VERTICAL.equals(splitType) ? this.options.classPanelContainerHoriz : this.options.classPanelContainerVert,
        retVal = new StringBuffer();

    panelContainerClass += rootPanel ? ' root-panel' : '';

    retVal.append('<div id="' + id + '" class="panel-container ' + panelContainerClass + '">');

    if (!PanelSplitType.NONE.equals(splitType)) {
        retVal.append(this.getSplitPanel(id, splitType));
    } else {
        retVal.append('<div id="' + id + this.options.idAdditionFirstPanel + '" class="panel-content ' + this.options.classPanel + '">');
        if (this.options.debug) {
            retVal.append(id);
        }
        retVal.append('</div>');
    }
    retVal.append('</div>');
    return retVal.toString();
};


/**
 *  Returns the splitPanel`s markup
 *  @param {string} id - The element id
 *  @param splitType {PanelSplitType} - The current splitType set
 *  @return {string} - The split panel`s markup
 */
PanelMarkup.prototype.getSplitPanel = function (id, splitType) {
    var firstPanelClass = PanelSplitType.VERTICAL.equals(splitType) ? this.options.classPanelLeft : this.options.classPanelTop,
        secondPanelClass = PanelSplitType.VERTICAL.equals(splitType) ? this.options.classPanelRight : this.options.classPanelBottom,
        retVal = new StringBuffer();
    retVal.append('<div id="' + id + this.options.idAdditionFirstPanel + '" class="' + this.options.classPanel + ' ' + firstPanelClass + '"></div>');
    retVal.append(this.getSplitter(id, splitType));
    retVal.append('<div id="' + id + this.options.idAdditionSecondPanel + '" class="' + this.options.classPanel + ' ' + secondPanelClass + '"></div>');
    return retVal.toString();
};


/**
 *  Returns the split panel`s splitter markup
 *  @param {string} id - The element id
 *  @param {PanelSplitType} splitType - The current splitType set
 *  @return {string} - The split panel`s markup
 */
PanelMarkup.prototype.getSplitter = function (id, splitType) {
    var retVal = new StringBuffer(),
        splitterClass = PanelSplitType.VERTICAL.equals(splitType) ?
            this.options.classSplitterVertical :
            this.options.classSplitterHorizontal;
    retVal.append('<div id="' + id + 'Splitter" class="' + this.options.classSplitter + ' ' + splitterClass + '" >');
    retVal.append('<div class="' + this.options.classSplitterVisualHandle + '"></div>');

    retVal.append('</div>');
    return retVal.toString()
};

PanelMarkup.prototype.getSplitPanelBlocker = function () {
    var retVal = new StringBuffer();
    retVal.append('<div class="' + this.options.classSplitPanelBlocker + '" style="display:none;"></div>');
    return retVal.toString();
};

/**
 *  Returns the contextmenu`s markup
 *  @return {String} - The context panel`s markup
 */
PanelMarkup.prototype.getCtxtMenuMarkup = function (isRootPanel) {
    var retVal = new StringBuffer();
    retVal.append('<div style="display:none; z-index:20; font-size:1.2em;position:relative;" class="fade-object ' + this.options.classPanelContextMenu + '">');
    retVal.append('<i style="left:2.2em;margin-top:-1px;" class="' + this.options.classPanelContextMenuBtn + ' btn-panel-split-vertical fa fa-minus-square-o fa-rotate-90" title="split vertically"></i>');
    if (!isRootPanel) {
        retVal.append('<i style="' + '' + '" class="' + this.options.classPanelContextMenuBtn + ' btn-panel-remove fa fa-trash-o" title="remove this panel" ></i>');
    }
    retVal.append('<i style="top:1.2em;" class="' + this.options.classPanelContextMenuBtn + ' btn-panel-split-horizontal fa fa-minus-square-o" title="split horizontally"></i>');
    retVal.append('<i style="left:2.2em;top:1.2em;" class="' + this.options.classPanelContextMenuBtn + ' btn-panel-add fa fa-edit" title="edit content"></i>');

    retVal.append('</div>');
    return retVal.toString();
};

module.exports = PanelMarkup;
