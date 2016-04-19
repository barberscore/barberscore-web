import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveVenue() {
      const flashMessages = Ember.get(this, 'flashMessages');
      var venue = this.get('store').createRecord('venue', {
        name: this.get('name'),
        city: this.get('city'),
        state: this.get('state'),
      });
      venue.save()
      .then(() => {
        flashMessages.success('Venue Added');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    }
  },
});

