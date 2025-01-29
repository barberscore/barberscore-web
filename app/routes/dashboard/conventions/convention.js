import Route from '@ember/routing/route';
// import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend({
  model({convention_id}) {
    return this.store.findRecord('convention', convention_id);
  },
});
