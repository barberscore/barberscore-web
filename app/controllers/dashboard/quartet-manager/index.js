import Ember from 'ember';

export default Ember.Controller.extend({

  sortedQuartetsProperties: [
    'status:asc',
    'name'
  ],
  sortedQuartets: Ember.computed.sort(
    'model',
    'sortedQuartetsProperties'
  )
});
