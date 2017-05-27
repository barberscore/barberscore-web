import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  currentUser: Ember.inject.service('current-user'),
  sessionIsDisabled: Ember.computed.alias(
    'currentUser.user.disabledAssignments'
  )
});
