import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveSession() {
var session = this.get('store').createRecord('session', {
        convention: this.get('convention'),
        kind: this.get('kind'),
      });
      session.save()
      .then(() => {
        this.set('kind', null);
        // this.get('flashMessages').success('Success');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
  },
  sessionChoices: [
    'Quartet',
    'Chorus',
    'Seniors',
    'Youth',
  ]
});
