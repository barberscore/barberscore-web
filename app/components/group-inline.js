import Ember from 'ember';

export default Ember.Component.extend({
  sess: Ember.inject.service('session'),
  actions: {
    updateGroup() {
      this.group.save();
    }
  }
});
