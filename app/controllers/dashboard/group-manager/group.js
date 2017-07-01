import Ember from 'ember';
import config from '../../../config/environment';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  isEditing: false,
  isCollapsed: true,
  isRoleEditing: false,
  isDisabled: Ember.computed.not('isEditing'),
  isRoleDisabled: Ember.computed.not('isRoleEditing'),
  collapseGroup: false,
  isRoleCollapsed: false,
  optionsSession: Ember.computed(function() {
    return this.get('store').query('session', {'status': 4});
  }),
  flashMessages: Ember.inject.service(),
  uploadPhoto: task(function * (file) {
    try {
      const host = config.APP.API_HOST;
      const namespace = config.APP.API_NAMESPACE;
      const target = this.get('model.id');
      let response = yield file.upload(`${host}/${namespace}/entity/${target}/image`);
      this.set('model.image', response.body.image);
      yield this.get('model').save();
      this.get('flashMessages').success("Saved!");
    } catch (e) {
      this.get('flashMessages').danger("Upload Failed!");
    }
  }).drop(),
  actions: {
    collapseHeader() {
      this.toggleProperty('isCollapsed');
    },
    setEditing() {
      this.set('isEditing', true);
    },
    undoEditing() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    saveEditing() {
      this.model.save()
      .then(() => {
        this.set('isEditing', false);
        this.get('flashMessages').success('Saved');
      });
    },
    addEntry() {
      var entry = this.get('store').createRecord('entry', {
        session: this.get('session'),
        group: this.get('model'),
      });
      entry.save()
      .then(() => {
        this.set('group', null);
        this.get('flashMessages').success('Success');
      });
    },
  },
});
