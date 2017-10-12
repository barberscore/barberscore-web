import { alias, not } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  session: service(),
  currentUser: service('current-user'),
  sessionIsDisabled: alias(
    'currentUser.user.disabledAssignments'
  ),
  isConventionManagerDisabled: not(
    'currentUser.user.person.isConventionManager'
  ),
  isSessionManagerDisabled: not(
    'currentUser.user.person.isSessionManager'
  ),
  isScoringManagerDisabled: not(
    'currentUser.user.person.isScoringManager'
  ),
  isOrganizationManagerDisabled: not(
    'currentUser.user.person.isOrganizationManager'
  ),
  isGroupManagerDisabled: not(
    'currentUser.user.person.isGroupManager'
  ),
  isPersonManagerDisabled: not(
    'currentUser.user.person.isPersonManager'
  ),
  isAwardManagerDisabled: not(
    'currentUser.user.person.isAwardManager'
  ),
  isJudgeManagerDisabled: not(
    'currentUser.user.person.isJudgeManager'
  ),
  isChartManagerDisabled: not(
    'currentUser.user.person.isChartManager'
  ),
});
