import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    updateMen(men) {
      this.get('model.performer').then((performer) => {
        performer.set('men', men);
        performer.save();
      });
    },
  }
});
