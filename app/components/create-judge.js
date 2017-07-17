import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  openModal: false,
  flashMessages: Ember.inject.service(),
  searchPerson: task(function* (term){
    yield timeout(600);
    return this.get('store').query('person', {
      'nomen__icontains': term,
      'page_size': 1000
      })
      .then((data) => data);
  }),
  officeCall: Ember.computed(function() {
    return this.get('store').query('office', {
      'is_cj': 'true', //TODO Hardcoded
      'page_size': 1000,
    });
  }),
  officeOptionsProperties: [
    'name:asc',
  ],
  officeOptions: Ember.computed.sort(
    'officeCall',
    'officeOptionsProperties'
  ),
  organizationCall: Ember.computed(function() {
    return this.get('store').query('organization', {
      'kind__in': '11,21', //TODO Hardcoded
      'page_size': 1000,
    });
  }),
  organizationOptionsProperties: [
    'name:asc',
  ],
  organizationOptions: Ember.computed.sort(
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
      // .catch((error) => {
      //   console.log(error);
      // });
    },
    clearJudge() {
      this.get('model').deleteRecord();
      this.set('openModal', false);
    }
  },
});
