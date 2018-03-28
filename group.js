import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  store: service(),
  model(params) {
    return this.get('store').findRecord('group', params.group_id);
  },
  afterModel(model, transition) {
    this.transitionTo('dashboard.groups.group.details', model.get('id'));
  }
});
