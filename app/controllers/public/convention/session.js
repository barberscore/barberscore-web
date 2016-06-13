import Ember from 'ember';

export default Ember.Controller.extend({
  roundsSort: ['num:desc', ],
  sortedRounds: Ember.computed.sort(
    'model.rounds',
    'roundsSort'
  ),
  finishedSort: ['rank', 'performer.group.name',],
  donePerformers: Ember.computed.filterBy(
    'model.performers',
    'status',
    'Published'
  ),
  finishedPerformers: Ember.computed.sort(
    'donePerformers',
    'finishedSort'
  )
});
