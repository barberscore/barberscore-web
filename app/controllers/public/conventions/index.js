import Ember from 'ember';

export default Ember.Controller.extend({
  recentConventions: Ember.computed.filterBy(
    'model',
    'year',
    2016
  )
});
