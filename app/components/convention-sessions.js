import Component from '@ember/component';
import { sort } from '@ember/object/computed';

export default Component.extend({
  sortedSessionsProperties: [
    'conventionName',
  ],
  sortedSessions: sort(
    'model.sessions',
    'sortedSessionsProperties'
  ),
});
