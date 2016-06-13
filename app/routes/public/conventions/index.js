import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.query('convention', {year: 2015, season: '1,2,4'});
  },
});
