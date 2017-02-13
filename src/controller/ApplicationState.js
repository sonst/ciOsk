var ApplicationState = new ApplicationStateImpl();
function ApplicationStateImpl(){
  this.rootPanel = null;

  this.const = {
    KEY_LOCAL_STORAGE : 'splitPanelState'
  }

}
module.exports = ApplicationState;
