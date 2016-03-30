import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveRecord() {
      // const flashMessages = Ember.get(this, 'flashMessages');
      // var organization = this.get('group').organization;
      console.log(this.model);
      // var contest = this.get('store').createRecord('contest', {
      //   session: this.get('session'),
      //   award: this.get('award'),
      // });
      // contest.save()
      // .then(() => {
      //   // flashMessages.success('Success');
      // })
      // .catch(() => {
      //   flashMessages.danger('Error');
      // });
    },
  },
  awardSortProperties: ['name:asc',],
  sortedAwards: Ember.computed.sort(
    'session.convention.organization.awards',
    'awardSortProperties'
  ),
});

