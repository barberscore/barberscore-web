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
      try {
        yield newParticipant.save();
        this.get('flashMessages').success("Saved");
      } catch(e) {
        e.errors.forEach((error) => {
          this.get('flashMessages').danger(error.detail);
        });
        newParticipant.deleteRecord();
      }
    } else {
      let participant = this.get('model.participants').findBy('member.id', this.get('member.id'));
      if (participant) {
        try {
          yield participant.destroyRecord();
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
