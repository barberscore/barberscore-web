import Route from '@ember/routing/route';
// import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend({
  model({ entry_id }) {
    return this.store.findRecord('entry', entry_id, {
    });
  }
});
