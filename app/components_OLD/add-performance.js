import Ember from 'ember';
// import moment from 'moment';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveRecord() {
      const flashMessages = Ember.get(this, 'flashMessages');
      var performance = this.get('store').createRecord('performance', {
        round: this.get('round'),
        performer: this.get('performer'),
        // slot: this.get('slot'),
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
  slotSort: [
    'num:asc',
  ],
  sortedSlots: Ember.computed.sort(
    'round.slots',
    'slotSort'
  ),
});
