import Ember from 'ember';
// import moment from 'moment';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveRecord() {
      const flashMessages = Ember.get(this, 'flashMessages');
      // var organization = this.get('group').organization;
      // console.log(organization);
      // var actual = {
      //   lower: moment().utc().format(),
      //   upper: moment().add(10, 'minutes').utc().format(),
      //   bounds: "[)"
      // };
      // var scheduled = {
      //   lower: moment().utc().format(),
      //   upper: moment().add(10, 'minutes').utc().format(),
      //   bounds: "[)"
      // };
      var performance = this.get('store').createRecord('performance', {
        round: this.get('round'),
        performer: this.get('performer'),
        actual: null,
        scheduled: null,
      });
      performance.save()
      .then(() => {
        // flashMessages.success('Success');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
  },
  performerSortProperties: ['name:asc',],
  sortedPerformers: Ember.computed.sort(
    'round.session.performers',
    'performerSortProperties'
  ),
});
