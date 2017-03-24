import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return this.get('store').findRecord('performer', params.performer_id);
  },
  setupController(controller, model) {
    controller.setProperties({
      model: model,
      selectedContests: model.get('contestants').mapBy('contest')
    });
  }
});
