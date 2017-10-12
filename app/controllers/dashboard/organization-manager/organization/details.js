import { inject as service } from '@ember/service';
import { not } from '@ember/object/computed';
import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  isEditing: false,
  isDisabled: not('isEditing'),
  isWrite: not('model.permissions.write'),
  flashMessages: service(),
  autosave: task(function* (property, value){
    this.get('model').set(property, value);
    yield timeout(1000);
    try {
      yield this.get('model').save();
      this.get('flashMessages').success("Saved");
    } catch(e) {
      e.errors.forEach((error) => {
        this.get('flashMessages').danger(error.detail);
      })
    }
  }).restartable(),
  actions: {
    editOrganization() {
      this.set('isEditing', true);
    },
    cancelOrganization() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deleteOrganization() {
      this.model.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
        this.transitionToRoute('dashboard');
      });
    },
    saveOrganization() {
      this.model.save()
      .then(() => {
        this.set('isEditing', false);
        this.get('flashMessages').success('Saved');
      });
    },
  },
});
