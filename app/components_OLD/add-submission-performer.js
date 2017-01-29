import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveRecord() {
var submission = this.get('store').createRecord('submission', {
        performer: this.get('performer'),
        title: this.get('title')
      });
      submission.save()
      .then(() => {
        this.get('flashMessages').success('Saved');
        this.set('title', null);
      })
      .catch((failure) => {
        this.set('title', null);
        submission.deleteRecord();
        this.get('flashMessages').danger(failure);
      });
    },
  },
});
