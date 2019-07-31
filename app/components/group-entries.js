import { sort, filterBy } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { task } from 'ember-concurrency';

export default Component.extend({
  flashMessages: service(),
  router: service(),
  store: service(),
  currentUser: service(),
  customCollapsed: true,
  customCollapsed2: true,
  customCollapsed3: true,
  groupEntries: computed(
    'model',
    function() {
      return this.store.query('entry', {
        'session__status__lt': 30, // TODO HARDCODED, all except finished
        'group_id': this.model.id,
        'page_size': 100
    });
  }),
  filteredEntries: filterBy(
    'groupEntries',
    'conventionStatus',
    'Active',
  ),
  sortedEntriesProperties: [
    'conventionStart:desc',
    'statusSort',
  ],
  sortedEntries: sort(
    'groupEntries',
    'sortedEntriesProperties'
  ),
  sessionCall: computed(
    'model',
    function() {
      let kinds = {
        'Chorus': 32,
        'Quartet': 41,
      };
      return this.store.query('session', {
        'status': 4, // TODO HARDCODED
        'kind': kinds[this.get('model.kind')],
        'is_invitational': false,
        'page_size': 100
    });
  }),
  sessionSortProperties: [
    'conventionName',
  ],
  sessionOptions: sort(
    'sessionCall',
    'sessionSortProperties'
  ),
  createEntryModal: false,
  createEntryModalError: false,
  saveEntry: task(function* (session){
    try {
      let entry = yield this.store.createRecord('entry', {
        session: session,
        groupId: this.model.id,
        repertories: [],
      }).save();
      let payload = yield entry.build({
        'by': this.get('currentUser.user.id'),
      });
      yield this.store.pushPayload(payload);
      this.set('createEntryModal', false);
      this.set('createEntryModalError', false);
      this.flashMessages.success("Created!");
      this.router.transitionTo('dashboard.groups.group.entries.entry', entry.get('id'));
    } catch(e) {
      e.errors.forEach((e) => {
        this.set('deleteEntryModalError', true);
        this.flashMessages.danger(e.detail);
      })
    }
  }).drop(),
  actions: {
    cancelEntry(entry){
      entry.deleteRecord();
    },
  }
});


