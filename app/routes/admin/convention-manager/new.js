import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  store: Ember.inject.service(),
  controllerName: 'admin/convention-manager/convention/details',
  templateName: 'admin/convention-manager/convention/details',
  model: function() {
    return this.get('store').createRecord('convention');
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

