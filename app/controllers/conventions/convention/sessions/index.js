import { sort } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  sortedSessionsProperties: [
    'kind:desc',
  ],
  sortedSessions: sort(
    'model.sessions',
    'sortedSessionsProperties'
  ),
});


