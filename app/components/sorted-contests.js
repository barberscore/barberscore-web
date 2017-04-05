import Ember from 'ember';

export default Ember.Component.extend({
  sortedContestsProperties: [
    'entityKindSort',
    'kind',
    'nomen',
  ],
  sortedContests: Ember.computed.sort(
    'session.contests',
    'sortedContestsProperties'
  ),
});
