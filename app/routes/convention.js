import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('convention', params.convention_id);
  }
});
