import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  openModal: false,
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
      'kind': 32, //TODO hard-coded
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
  actions: {
    saveOfficer() {
      this.get('model').save()
      .then(() => {
        this.set('openModal', false);
        this.get('flashMessages').success('Saved');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
        // console.log(error);
      });
    },
    clearOfficer() {
      this.get('model').deleteRecord();
      this.set('openModal', false);
    }
  },
});
