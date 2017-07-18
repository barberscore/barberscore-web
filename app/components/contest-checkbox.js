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
    'award',
    'contests.@each.award',
    function(){
      let mapped = this.get('contests').mapBy('award.id');
      if (mapped.includes(this.get('award.id'))) {
        return true;
      } else {
        return false;
      }
  }),
  toggleAward: task(function* (property, value){
    if (value) {
      let newContest = this.get('store').createRecord('contest', {
        award: this.get('award'),
        kind: this.get('award.kind'),
        session: this.get('model'),
        isQualifier: false,
      });
      yield newContest.save();
      this.get('flashMessages').success("Saved");
    } else {
      let contest = this.get('model.contests').findBy('award.id', this.get('award.id'));
      contest.destroyRecord().then(()=> this.get('flashMessages').success("Saved"));
    }
  }).restartable(),
});
