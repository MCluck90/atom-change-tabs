var CompositeDisposable = require('atom').CompositeDisposable,
    ChangeTabs;

module.exports = ChangeTabs = {
  subscriptions: null,

  activate: function(state) {
    var self = this,
        commands = {};
    // Generate the commands for up to 10 tabs
    for (var i = 1; i <= 10; i++) {
      (function(index) {
        commands['change-tabs:' + index] = function() {
          self.changeTab(index - 1);
        };
      })(i);
    }

    this.subscriptions = new CompositeDisposable();
    return this.subscriptions.add(atom.commands.add('atom-workspace', commands));
  },
  deactivate: function() {
    this.subscriptions.dispose();
  },
  changeTab: function(index) {
    var tabs = document.querySelector('.pane.active .tab-bar').children;
    if (index < tabs.length) {
      tabs[index].click();
    }
  }
};
