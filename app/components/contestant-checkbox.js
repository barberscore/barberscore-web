import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  isDisabled: Ember.computed.equal(
    'model.status',
    'Published',
  ),
  isSelected: Ember.computed(
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
