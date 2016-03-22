import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  performanceSortProperties: ['slot',],
  sortedPerformances: Ember.computed.sort(
    'model.performances',
    'performanceSortProperties'
  ),
  actions: {
    saveDate(date, performance) {
      var scheduled = {
        lower: moment(date).utc().format(),
        upper: moment(date).add(10, 'minutes').utc().format(),
        bounds: "[)"
      };
      performance.set('scheduled', scheduled);
      performance.save();
    },
    drawRound(round) {
      const flashMessages = Ember.get(this, 'flashMessages');
      round.draw()
      .then(() => {
        flashMessages.success('Success');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
      round.reload();
    },
  },
});
