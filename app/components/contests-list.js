import Component from '@ember/component';

export default Component.extend({
  sortedContests: [],
  didReceiveAttrs: function() {
    this._super(...arguments);
    this.setSortedContests();
  },
  setSortedContests: function() {
    const that = this;
    this.get('model.contests').then(function(contests) {
      contests = contests.toSorted(function(a, b) {
        return a.treeSort < b.treeSort ? -1 : 1;
      });
      that.set('sortedContests', contests);
    });
  },
});
