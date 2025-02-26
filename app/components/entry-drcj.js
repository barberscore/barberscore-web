import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { computed } from '@ember/object';

export default Component.extend({
  mtHelp: true,
  prelimHelp: true,
  baseHelp: true,
  isDisabled: computed('model.{permissions.write,session.roundsPublished}', function() {
    if (this.get('model.session.status') != 'Packaged') {
      return true;
    }
    if (this.get('model.session.roundsPublished')) {
      return true;
    }
    if (this.get('model.permissions.write')) {
      return false;
    } else {
      return true;
    }
  }),
  flashMessages: service(),
  autosave: task(function* (property, value){
    this.model.set(property, value);
    yield timeout(1000);
    try {
      yield this.model.save();
      this.flashMessages.success("Saved");
    } catch(e) {
      e.errors.forEach((error) => {
        this.flashMessages.danger(error.detail);
      })
    }
  }).restartable(),
  actions: {
    toggleProperty: function(propertyName) {
      this.toggleProperty(propertyName);
    },
  }
});
