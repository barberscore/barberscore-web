import { sort } from '@ember/object/computed';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  openModal: false,
  flashMessages: service(),
  searchPerson: task(function* (term){
    yield timeout(600);
    return this.get('store').query('person', {
      'nomen__icontains': term,
      'page_size': 1000
      })
      .then((data) => data);
  }),
  officeCall: computed(function() {
    return this.get('store').query('office', {
      'is_cj': 'true', //TODO Hardcoded
      'page_size': 1000,
    });
  }),
  officeOptionsProperties: [
    'name:asc',
  ],
  officeOptions: sort(
    'officeCall',
    'officeOptionsProperties'
  ),
  organizationCall: computed(function() {
    return this.get('store').query('organization', {
      'kind__in': '11,21', //TODO Hardcoded
      'page_size': 1000,
    });
  }),
  organizationOptionsProperties: [
    'name:asc',
  ],
  organizationOptions: sort(
    'organizationCall',
    'organizationOptionsProperties'
  ),
  actions: {
    saveJudge() {
      this.get('model').save()
      .then(() => {
        this.set('openModal', false);
        this.get('flashMessages').success('Saved');
      });
    },
    clearJudge() {
      this.get('model').deleteRecord();
      this.set('openModal', false);
    }
  },
});
