import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';

export default Controller.extend({
  sortedSessionsProperties: [
    'kind:desc',
  ],
  sortedSessions: sort(
    'model',
    'sortedSessionsProperties'
  ),
});
