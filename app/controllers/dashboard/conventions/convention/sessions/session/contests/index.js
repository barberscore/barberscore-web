import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';
import { computed } from '@ember/object';

export default Controller.extend({
  sortedContestsProperties: [
    'treeSort',
  ],
  sortedContests: computed('model.contests.@each.id', function() {
    var sortKeys = this.get('sortedContestsProperties');
    return this.get('model.contests');
  })
});
