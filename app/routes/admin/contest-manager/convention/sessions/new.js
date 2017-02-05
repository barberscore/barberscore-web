import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  store: Ember.inject.service(),
  controllerName: 'admin/contest-manager/convention/sessions/session/details',
  templateName: 'admin/contest-manager/convention/sessions/session/details',
  model: function() {
    let convention_id = this.paramsFor('admin.contest-manager.convention').convention_id;
    let convention = this.get('store').peekRecord('convention', convention_id);
    return this.get('store').createRecord('session', {
      convention: convention,
    });
  },
  setupController(controller, model) {
    // Call _super for default behavior
    this._super(controller, model);
    // Implement your custom setup after
    controller.set('isEditing', true);
  },
  cleanModel: function() {
      var model = this.modelFor( this.routeName );
      if (model.get('isNew')) {
          model.deleteRecord();
      }
  }.on('deactivate')
});

