import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  currentUser: Ember.inject.service('current-user'),
  isNotStaff: Ember.computed.not(
    'currentUser.user.is_staff'
  )
});
