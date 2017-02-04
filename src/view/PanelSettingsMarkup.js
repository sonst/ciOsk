var StringBuffer = require('../util/StringBuffer');
var Utils        = require('../util/Utils');

function PanelSettingsMarkup(options){
  this.options = Utils.mergeObjects( options , {
    id:             'panelSettings',
    classContainer: 'panel-settings',
    classDialog:    'panel-settings-diag',
    classBtn:       'panel-settings-btn',
    classFooter:    'panel-settings-footer',
    classContent:   'settings-content',
    classBtnOk:     'btn-ok',
    classBtnCancel: 'btn-cancel',
    classInputUrl:  'input-url'
  });
}

PanelSettingsMarkup.prototype.getContainer = function(){
  var retVal = new StringBuffer();
  retVal.append('<div id="'+this.options.id+'" style="display:none;" class="'+this.options.classContainer+'">');
  retVal.append('<div class="'+this.options.classDialog+'">')
  retVal.append('<h3 data-i18n="panelSettings.header" >Content:</h3>');
  retVal.append('<div class="'+this.options.classContent+'">');
  retVal.append('<table>');
  var i =0;
  retVal.append(this.getUrlInput('inpSttng_'+i));
  retVal.append('</table>');
  retVal.append('</div>');
  retVal.append('<div class="'+this.options.classFooter+'">');
  retVal.append('<div class="'+this.options.classBtnCancel+' '+this.options.classBtn+'" >Cancel</div>');
  retVal.append('<div class="'+this.options.classBtnOk+' '+this.options.classBtn+'" >OK</div>');
  retVal.append('</div>');
  retVal.append('</div>');
  retVal.append('</div>');
  return retVal.toString();
}

PanelSettingsMarkup.prototype.getUrlInput = function(inputId){
  var retVal = new StringBuffer();
  retVal.append('<tr>');
  retVal.append('<td>');
  retVal.append('<label data-i18n="panelSettings.inputs.url.label">Url:</label>');
  retVal.append('</td>');
  retVal.append('<td>');
  retVal.append('<input id="'+inputId+'" data-i18n="[placeholder]panelSettings.inputs.url.placeholder" class="'+this.options.classInputUrl+'" type="text" value=""></input>');
  retVal.append('</td>');
  retVal.append('<td>');
  retVal.append('<i style="font-size:1em;margin-left:1em;" class="fa fa-plus"></i>');
  retVal.append('</td>');
  retVal.append('</tr>');
  return retVal.toString();
};

module.exports = PanelSettingsMarkup;
