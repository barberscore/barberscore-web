import { not } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  currentUser: service('current-user'),
  isGroupManagerDisabled: not(
    'currentUser.user.isGroupManager'
  ),
  isSessionManagerDisabled: not(
    'currentUser.user.isSessionManager'
  ),
  isScoringManagerDisabled: not(
    'currentUser.user.isScoringManager'
  ),
});
