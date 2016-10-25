import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveRecord() {
      const flashMessages = Ember.get(this, 'flashMessages');
      var submission = this.get('store').createRecord('submission', {
        performer: this.get('performer'),
        title: this.get('title')
      });
      submission.save()
      .then(() => {
        flashMessages.success('Saved');
        this.set('title', null);
      })
      .catch((failure) => {
        this.set('title', null);
        submission.deleteRecord();
        flashMessages.danger(failure);
      });
    },
  },
});
