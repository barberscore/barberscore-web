import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { not, or } from '@ember/object/computed';

export default Controller.extend({
  currentUser: service(),
  groupManager: or(
    'currentUser.user.isGroupManager',
  ),
  groupDisabled: not(
    'groupManager',
  ),
  assignmentManager: or(
    'currentUser.user.isConventionManager',
    'currentUser.user.isSessionManager',
    'currentUser.user.isRoundManager',
    'currentUser.user.isScoringManager',
  ),
  assignmentDisabled: not(
    'assignmentManager',
  )
});


