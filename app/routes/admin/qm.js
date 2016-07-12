import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function() {
    // let groups = this.store.findAll('group');
    // return groups.filterBy(
      // 'kind',
      // 'Quartet'
    // );
    // return this.store.findAll('group').filterBy('kind', 'Quartet');
    return this.get('store').query('group', {kind: 1})
  },
});
