import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    updateGroup() {
      this.group.save();
    }
  }
});
