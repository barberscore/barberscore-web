import Component from '@ember/component';
import { sort } from '@ember/object/computed';

export default Component.extend({
  didReceiveAttrs: function() {
    this._super(...arguments);
    this.setStateLogs();
  },
  setStateLogs: function() {
    const that = this;
    this.get('model.statelogs').then(function(statelogs) {
      statelogs = statelogs.toSorted(function(a, b) {
        return a.timestamp < b.timestamp ? -1 : 1;
      })
      that.set('sortedStatelogs', statelogs);
    });
  },
});
