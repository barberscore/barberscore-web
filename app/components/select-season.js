import Ember from 'ember';

export default Ember.Component.extend({
  // actions: {
  //   saveRecord(role) {
  //     this.model.set('lead', role);
  //     const flashMessages = Ember.get(this, 'flashMessages');
  //     this.model.save()
  //     .then(() => {
  //       flashMessages.success('Success');
  //     })
  //     .catch(() => {
  //       flashMessages.danger('Error');
  //     });
  //   },
  // },
  seasonChoices: [
    'International',
    'Midwinter',
    'Spring',
    'Fall',
  ],
});
