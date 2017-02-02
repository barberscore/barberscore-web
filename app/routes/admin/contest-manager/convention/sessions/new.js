import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  store: Ember.inject.service(),
  model: function() {
    let convention_id = this.paramsFor('admin.contest-manager.convention').convention_id;
    let convention = this.get('store').peekRecord('convention', convention_id);
    return this.get('store').createRecord('session', {
      convention: convention,
    });
  },
  cleanModel: function() {
      var model = this.modelFor( this.routeName );
      if (model.get('isNew')) {
          model.deleteRecord();
      }
  }.on('deactivate')
});

