import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import {
  task
} from 'ember-concurrency';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  isDisabled: equal(
    'model.status',
    'Published',
  ),
  isSelected: computed(
    'award',
    'contests.@each.award',
    function () {
      let mapped = this.get('contests').mapBy('award.id');
      if (mapped.includes(this.get('award.id'))) {
        return true;
      } else {
        return false;
      }
    }),
  toggleAward: task(function* (property, value) {
    if (value) {
      let newContest = this.get('store').createRecord('contest', {
        award: this.get('award'),
        kind: this.get('award.kind'),
        session: this.get('model'),
        contestants: [],
        isQualifier: false,
      });
      yield newContest.save();
      this.get('flashMessages').success("Saved");
    } else {
      let contest = this.get('model.contests').findBy('award.id', this.get('award.id'));
      contest.destroyRecord().then(() => this.get('flashMessages').success("Saved"));
    }
  }).restartable(),
});
