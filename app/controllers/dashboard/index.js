import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  currentUser: Ember.inject.service('current-user'),
  sessionIsDisabled: Ember.computed.alias(
    'currentUser.user.disabledAssignments'
  ),
  isConventionManagerDisabled: Ember.computed.not(
    'currentUser.user.person.isConventionManager'
  ),
  isSessionManagerDisabled: Ember.computed.not(
    'currentUser.user.person.isSessionManager'
  ),
  isScoringManagerDisabled: Ember.computed.not(
    'currentUser.user.person.isScoringManager'
  ),
  isOrganizationManagerDisabled: Ember.computed.not(
    'currentUser.user.person.isOrganizationManager'
  ),
  isGroupManagerDisabled: Ember.computed.not(
    'currentUser.user.person.isGroupManager'
  ),
  isPersonManagerDisabled: Ember.computed.not(
    'currentUser.user.person.isPersonManager'
  ),
  isAwardManagerDisabled: Ember.computed.not(
    'currentUser.user.person.isAwardManager'
  ),
  isJudgeManagerDisabled: Ember.computed.not(
    'currentUser.user.person.isJudgeManager'
  ),
  isChartManagerDisabled: Ember.computed.not(
    'currentUser.user.person.isChartManager'
  ),
});
