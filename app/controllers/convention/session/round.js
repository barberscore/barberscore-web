import Ember from 'ember';

export default Ember.Controller.extend({
  sess: Ember.inject.service('session'),
});
