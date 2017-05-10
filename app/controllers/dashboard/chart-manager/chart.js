import Ember from 'ember';

export default Ember.Controller.extend({
  isEditing: false,
  isDisabled: Ember.computed.not('isEditing'),
  flashMessages: Ember.inject.service(),
  actions: {
    editChart() {
      this.set('isEditing', true);
    },
    cancelChart() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    saveChart() {
      this.model.save()
      .then(() => {
        this.set('isEditing', false);
        this.get('flashMessages').success('Saved');
      });
    },
  },
});
