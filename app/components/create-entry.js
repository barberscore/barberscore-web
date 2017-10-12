import { filterBy, sort } from '@ember/object/computed';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  flashMessages: service(),
  store: service(),
  openModal: false,
  searchPerson: task(function* (term){
    yield timeout(600);
    return this.get('store').query('person', {
      'nomen__icontains': term,
      'page_size': 1000
      })
      .then((data) => data);
  }),
  sessionCall: computed(function() {
    return this.get('store').query('session', {
        'status': 4
      });
  }),
  sessionFilter: filterBy(
    'sessionCall',
    'kind',
    'Chorus'
  ),
  sessionSortProperties: [
    'nomen:asc',
  ],
  sessionOptions: sort(
    'sessionFilter',
    'sessionSortProperties'
  ),
  representingCall: computed(function() {
    return this.get('store').query('organization', {
        'kind__lt': '20',
        'page_size': 100,
      });
  }),
  representingSortProperties: [
    'nomen:asc',
  ],
  representingOptions: sort(
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
