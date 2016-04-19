import Ember from 'ember';

export default Ember.Controller.extend({
  isEditing: false,
  actions: {
    newVenue() {
      let newVenue = this.store.createRecord(
        'venue'
      );
      this.set('model', newVenue);
      this.set('isEditing', true);
    },
    editVenue() {
      this.set('isEditing', true);
    },
    cancelVenue() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deleteVenue() {
      this.model.destroyRecord();
    },
    saveVenue() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.save()
      .then(() => {
        this.set('isEditing', false);
        flashMessages.success('Saved');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
  },
  timezoneChoices: [
    'US/Arizona',
    'US/Central',
    'US/Eastern',
    'US/Hawaii',
    'US/Mountain',
    'US/Pacific',
  ]
});
