import { uniq, sort, alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { task } from 'ember-concurrency';

export default Controller.extend({
  flashMessages: service(),
  store: service(),
  organizationCall: computed(function() {
    return this.get('store').query('organization', {
      'status': 10,
      'page_size': 1000,
    });
  }),
  organizationUniques: uniq(
    'organizationCall',
  ),
  organizationOptionsProperties: [
    'orgSort',
  ],
  organizationOptions: sort(
    'organizationUniques',
    'organizationOptionsProperties',
  ),
  grantorOptions: alias(
    'organizationOptions',
  ),
  saveConvention: task(function* (){
    try {
      let convention = yield this.get('model').save();
      this.get('flashMessages').success('Saved');
      this.transitionToRoute('dashboard.convention-manager.convention.details', convention);
    } catch(e) {
      e.errors.forEach((error) => {
        this.get('flashMessages').danger(error.detail);
      })
    }
  }),
  actions: {
    clearConvention() {
      this.get('model').deleteRecord();
      this.transitionToRoute('dashboard.convention-manager.index');
    }
  },
});
