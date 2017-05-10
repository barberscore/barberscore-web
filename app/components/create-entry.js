import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Component.extend({
  flashMessages: Ember.inject.service(),
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
  sessionCall: Ember.computed(function() {
    return this.get('store').query('session', {
        'status': 4
      });
  }),
  sessionFilter: Ember.computed.filterBy(
    'sessionCall',
    'kind',
    'Chorus'
  ),
  sessionSortProperties: [
    'nomen:asc',
  ],
  sessionOptions: Ember.computed.sort(
    'sessionFilter',
    'sessionSortProperties'
  ),
  representingCall: Ember.computed(function() {
    return this.get('store').query('entity', {
        'kind__lt': '20',
        'page_size': 100,
      });
  }),
  representingSortProperties: [
    'nomen:asc',
  ],
  representingOptions: Ember.computed.sort(
    'representingCall',
    'representingSortProperties'
  ),
  actions: {
    saveEntry() {
      this.get('model').save()
      .then(() => {
        this.set('openModal', false);
        this.get('flashMessages').success('Saved');
      });
    },
    clearEntry() {
      this.get('model').deleteRecord();
      this.set('openModal', false);
    }
  },
});
