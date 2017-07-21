import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  isDisabled: false,
  isSelected: Ember.computed(
    'member',
    'participants.@each.member',
    function(){
      let mapped = this.get('participants').mapBy('member.id');
      if (mapped.includes(this.get('member.id'))) {
        return true;
      } else {
        return false;
      }
  }),
  toggleParticipant: task(function* (property, value){
    if (value) {
      let newParticipant = this.get('store').createRecord('participant', {
        member: this.get('member'),
        entry: this.get('model'),
      });
      yield newParticipant.save();
      this.get('flashMessages').success("Saved");
    } else {
      let contestant = this.get('model.participants').findBy('member.id', this.get('member.id'));
      contestant.destroyRecord().then(()=> this.get('flashMessages').success("Saved"));
    }
  }).restartable(),
});
