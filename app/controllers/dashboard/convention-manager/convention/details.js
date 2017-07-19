import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  isDisabled: Ember.computed.equal('model.status', 'Published'),
  organizationCall: Ember.computed(function() {
    return this.get('store').query('organization', {
      'kind__lt': 20, //TODO Hardcoded
      'page_size': 100,
    });
  }),
  organizationOptionsProperties: [
    'kindSort:asc',
    'name:asc',
  ],
  organizationOptions: Ember.computed.sort(
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
