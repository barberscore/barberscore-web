import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveSession() {
      const flashMessages = Ember.get(this, 'flashMessages');
      var session = this.get('store').createRecord('session', {
        convention: this.get('convention'),
        kind: this.get('kind'),
      });
      session.save()
      .then(() => {
        this.set('kind', null);
        // flashMessages.success('Success');
      })
      .catch(() => {
        flashMessages.danger('Error');
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
