import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.query('group', {status: 10});
  },
});
