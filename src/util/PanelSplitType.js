var PanelSplitType = new PanelSplitTypeImpl();
function PanelSplitTypeImpl(){
  this.HORIZONTAL = 'PanelSplitType.horizontal';
  this.VERTICAL   = 'PanelSplitType.vertical';
  this.NONE       = 'PanelSplitType.none';
}

module.exports = PanelSplitType;
