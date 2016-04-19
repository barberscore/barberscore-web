import Ember from 'ember';

export default Ember.Controller.extend({
  isStatic: true,
  actions: {
    newVenue() {
      this.set('isStatic', false);
    },
    editVenue() {
      this.set('isStatic', false);
    },
    cancelVenue() {
      this.model.rollbackAttributes();
      this.set('isStatic', true);
    },
    deleteVenue() {
      this.model.destroyRecord();
    },
    saveVenue() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.save()
      .then(() => {
        this.set('isStatic', true);
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
