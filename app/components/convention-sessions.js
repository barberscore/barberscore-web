import Component from '@ember/component';
import { sort } from '@ember/object/computed';

export default Component.extend({
  sortedSessionsProperties: [
    'kind:desc',
  ],
  sortedSessions: sort(
    'model.sessions',
    'sortedSessionsProperties'
  ),
});
