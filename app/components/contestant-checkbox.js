import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { task } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  isDisabled: equal(
    'model.status',
    'Published',
  ),
  isSelected: computed(
    'contest',
    'contestants.@each.contest',
    function(){
      let mapped = this.get('contestants').mapBy('contest.id');
      if (mapped.includes(this.get('contest.id'))) {
        return true;
      } else {
        return false;
      }
  }),
  toggleAward: task(function* (property, value){
    if (value) {
      let newContestant = this.get('store').createRecord('contestant', {
        contest: this.get('contest'),
        entry: this.get('model'),
      });
      try {
        yield newContestant.save();
        this.get('flashMessages').success("Saved");
      } catch(e) {
        e.errors.forEach((error) => {
          this.get('flashMessages').danger(error.detail);
        });
        newContestant.deleteRecord();
      }
    } else {
      let contestant = this.get('model.contestants').findBy('contest.id', this.get('contest.id'));
      if (contestant) {
        try {
          yield contestant.destroyRecord();
          this.get('flashMessages').success("Saved");
        } catch(e) {
          e.errors.forEach((error) => {
            this.get('flashMessages').danger(error.detail);
          });
        }
      }
    }
  }).restartable(),
});
