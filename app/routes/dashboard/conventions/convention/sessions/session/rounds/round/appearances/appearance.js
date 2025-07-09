import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
// import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend({
  store: service(),
  model({ appearance_id }) {
    return this.store.findRecord('appearance', appearance_id, {
    });
  }
});
