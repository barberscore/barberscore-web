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
      console.log(date);
      console.log(performance);
      var scheduled = {
        lower: moment(date).utc().format(),
        upper: moment(date).add(10, 'minutes').utc().format(),
        bounds: "[)"
      };
      performance.set('scheduled', scheduled);
      performance.save();
    }
  },
});
