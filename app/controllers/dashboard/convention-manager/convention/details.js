import { computed } from '@ember/object';
import { not, sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  store: service(),
  flashMessages: service(),
  isDisabled: not('model.permissions.write'),
  organizationCall: computed(function() {
    return this.get('store').query('organization', {
      'kind__lt': 20, //TODO Hardcoded
      'page_size': 100,
    });
  }),
  organizationOptionsProperties: [
    'kindSort:asc',
    'name:asc',
  ],
  organizationOptions: sort(
    'organizationCall',
    'organizationOptionsProperties'
  ),
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
});
