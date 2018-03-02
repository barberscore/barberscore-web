import { not } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  session: service(),
  currentUser: service('current-user'),
  algolia: service(),
  isConventionManagerDisabled: not(
    'currentUser.user.isConventionManager'
  ),
  isSessionManagerDisabled: not(
    'currentUser.user.isSessionManager'
  ),
  isScoringManagerDisabled: not(
    'currentUser.user.isScoringManager'
  ),
  isGroupManagerDisabled: not(
    'currentUser.user.isGroupManager'
  ),
  isPersonManagerDisabled: not(
    'currentUser.user.isPersonManager'
  ),
  isAwardManagerDisabled: not(
    'currentUser.user.isAwardManager'
  ),
  isJudgeManagerDisabled: not(
    'currentUser.user.isJudgeManager'
  ),
  isChartManagerDisabled: not(
    'currentUser.user.isChartManager'
  ),
  actions: {
    // search() {
    //   console.log(this.get('algolia'))
    // }
  }
});
