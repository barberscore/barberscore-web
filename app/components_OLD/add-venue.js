import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveVenue() {
var venue = this.get('store').createRecord('venue', {
        name: this.get('name'),
        city: this.get('city'),
        state: this.get('state'),
      });
      venue.save()
      .then(() => {
        this.get('flashMessages').success('Venue Added');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    }
  },
});

