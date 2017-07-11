import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  currentUser: Ember.inject.service('current-user'),
  sessionIsDisabled: Ember.computed.alias(
    'currentUser.user.disabledAssignments'
  ),
  isConventionManagerDisabled: Ember.computed.not(
    'currentUser.user.person.isConventionManager.length'
  ),
  isSessionManagerDisabled: Ember.computed.not(
    'currentUser.user.person.isSessionManager.length'
  ),
  isScoringManagerDisabled: Ember.computed.not(
    'currentUser.user.person.isScoringManager.length'
  ),
  isOrganizationManagerDisabled: Ember.computed.not(
    'currentUser.user.person.isOrganizationManager.length'
  ),
  isGroupManagerDisabled: Ember.computed.not(
    'currentUser.user.person.isGroupManager.length'
  ),
  isPersonManagerDisabled: Ember.computed.not(
    'currentUser.user.person.isPersonManager.length'
  ),
  isAwardManagerDisabled: Ember.computed.not(
    'currentUser.user.person.isAwardManager.length'
  ),
  isJudgeManagerDisabled: Ember.computed.not(
    'currentUser.user.person.isJudgeManager.length'
  ),
  isChartManagerDisabled: Ember.computed.not(
    'currentUser.user.person.isChartManager.length'
  ),
});
