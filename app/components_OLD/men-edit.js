import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    updateMen(men) {
      this.model.set('men', men);
      this.model.save();
    },
  }
});
