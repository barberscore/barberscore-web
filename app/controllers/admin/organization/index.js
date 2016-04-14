import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveOrganization() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.save()
      .then(() => {
        flashMessages.success("Saved" );
      })
      .catch(() => {
        flashMessages.danger("Error" );
      });
    }
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
