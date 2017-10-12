import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { task } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  flashMessages: service(),
  isDisabled: false,
  isSelected: computed(
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
        part: this.get('member.part'),
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
