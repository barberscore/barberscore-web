import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.query('convention', {year__gte: 2015, year__lte: 2016});
  },
});
