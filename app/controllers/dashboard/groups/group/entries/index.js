import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { task } from 'ember-concurrency';

export default Controller.extend({
  flashMessages: service(),
  router: service(),
  store: service(),
  currentUser: service(),
  customCollapsed: true,
  customCollapsed2: true,
  customCollapsed3: true,
  sortedEntriesProperties: [
    'statusSort',
  ],
  sortedEntries: sort(
    'model',
    'sortedEntriesProperties'
  ),
  sessionCall: computed(
    'model',
    function() {
      let kinds = {
        'Chorus': 32,
        'Quartet': 41,
      };
      return this.store.query(
        'session', {
          filter: {
            'status': 4, // TODO HARDCODED
            'kind': kinds[this.get('model.kind')],
            'is_invitational': false,
          },
        }
      );
    }
  ),
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
      let owners = yield this.model.get('owners');
      let entry = yield this.store.createRecord('entry', {
        session: session,
        groupId: this.model.id,
        repertories: [],
        owners: owners,
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


