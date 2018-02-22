import { not, sort, filterBy } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { task } from 'ember-concurrency';

export default Component.extend({
  flashMessages: service(),
  router: service(),
  store: service(),
  isDisabled: not(
    'model.permissions.write',
  ),
  filteredEntries: filterBy(
    'model.entries',
    'notArchived'
  ),
  sortedEntriesProperties: [
    'statusSort:desc',
  ],
  sortedEntries: sort(
    'filteredEntries',
    'sortedEntriesProperties'
  ),
  sessionCall: computed(
    'model',
    function() {
      let kinds = {
        'Chorus': 32,
        'Quartet': 41,
      };
      return this.get('store').query('session', {
        'status': 4, // TODO HARDCODED
        'kind': kinds[this.get('model.kind')],
        'is_invitational': false,
        'page_size': 100
    });
  }),
  sessionSortProperties: [
    'nomen',
  ],
  sessionOptions: sort(
    'sessionCall',
    'sessionSortProperties'
  ),
  saveEntry: task(function* (entry){
    try {
      yield entry.save();
      entry.get('contestants').then(function(contestants) {
        return contestants.reload();
      });
      this.get('flashMessages').success('Saved');
      this.get('router').transitionTo('dashboard.group-manager.group.entries.entry', entry);
    } catch(e) {
      e.errors.forEach((e) => {
        this.get('flashMessages').danger(e.detail);
      })
    }
  }),
  createEntry: task(function *() {
    yield this.get('store').createRecord('entry', {
      group: this.get('model'),
      description: '',
      contestants: [],
    });
  }).drop(),
  actions: {
    cancelEntry(entry){
      entry.deleteRecord();
    },
  }
});


