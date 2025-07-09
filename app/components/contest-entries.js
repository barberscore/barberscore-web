import Component from '@ember/component';

export default Component.extend({
  sortedEntries: [],
  didReceiveAttrs: function() {
    this._super(...arguments);
    this.setEntries();
    this.setContests();
  },
  setEntries: function() {
    const that = this;
    this.get('model.entries')
      .then(function(entries) {
        entries = entries.toSorted(function(a, b) {
          return a.name < b.name ? -1 : 1;
        });
        that.set('sortedEntries', entries);
      });
  },
  setContests: function() {
    const that = this;
    this.get('model.session.contests')
      .then(function(contests) {
        contests = contests.toSorted(function(a, b) {
          return a.treeSort < b.treeSort ? -1 : 1;
        });
        that.set('sortedContests', contests);
      });
  },
})
