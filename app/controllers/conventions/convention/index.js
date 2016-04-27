import Ember from 'ember';

export default Ember.Controller.extend({
  sessionSortProperties: ['kind:asc',],
  sortedSessions: Ember.computed.sort(
    'model.sessions',
    'sessionSortProperties'
  ),
  participantSortProperties: ['lft:asc',],
  sortedParticipants: Ember.computed.sort(
    'model.participants',
    'participantSortProperties'
  ),
});
