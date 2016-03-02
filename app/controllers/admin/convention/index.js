import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  actions: {
    saveDate(start, end) {
      var date = {
        lower: start,
        upper: end,
        bounds: "[)"
      };
      this.model.set('date', date);
      this.model.save();
    }
  }
});
