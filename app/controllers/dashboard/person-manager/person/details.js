import { computed } from '@ember/object';
import { not, sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  store: service(),
  currentUser: service(),
  flashMessages: service(),
  isDisabled: not(
    'model.permissions.write'
  ),
  location: '',
  representingCall: computed(function() {
    return this.get('store').query('organization', {
        'kind__lte': '31',
        'page_size': 100,
      });
  }),
  representingSortProperties: [
    'kindSort:asc',
    'name:asc',
  ],
  representingOptions: sort(
    'representingCall',
    'representingSortProperties'
  ),
  representing: computed(
    'model.representing',
    function() {
      return this.get('model.representing');
    }
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
