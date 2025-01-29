import Route from '@ember/routing/route';
// import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend({
  model({group_id}) {
    return this.store.findRecord('group', group_id, {
      include: 'charts',
    });
  },
});
