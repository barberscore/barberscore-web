import Ember from 'ember';

export default Ember.Route.extend({
  mid: function() {
    return this.store.findRecord('round', '76b8d12a-8e86-465c-beb3-12ef63e8e932');
  }
});
