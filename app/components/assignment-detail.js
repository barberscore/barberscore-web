import Component from '@ember/component';

export default Component.extend({
  sortedAssignments: [],
  didReceiveAttrs: function() {
    this._super(...arguments);
    this.setSortedAssignments();
  },
  setSortedAssignments: function() {
    const that = this;
    this.get('model.session.assignments').then(function(assignments) {
      assignments = assignments.toSorted(function(a, b) {
        if (a.kindSort != b.kindSort)
          return a.kindSort < b.kindSort ? -1 : 1;
        if (a.categorySort != b.categorySort)
          return a.categorySort < b.categorySort ? -1 : 1;
        if (a.lastName != b.lastName)
          return a.lastName < b.lastName ? -1 : 1;
        if (a.firstName != b.firstName)
          return a.firstName < b.firstName ? -1 : 1;
      });
      that.set('sortedAssignments', assignments);
    });
  },
});
