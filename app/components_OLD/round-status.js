import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveRecord(status) {
      this.model.set('status', status);
      this.model.save()
      .then(() => {
        // this.get('flashMessages').success('Success');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
  },
  roundStatus: [
    'New',
    'Validated',
    'Started',
    'Finished',
    'Published',
  ]
});
