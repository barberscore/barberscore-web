import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
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
    'model.entries',
    'sortedEntriesProperties'
  ),
  sessionSortProperties: [
    'district',
    'name',
  ],
  sessionOptions: sort(
    'model.sessions',
    'sessionSortProperties'
  ),
  createEntryModal: false,
  createEntryModalError: false,
  saveEntry: task(function* (session){
    try {
      let owners = yield this.model.group.get('owners');
      let entry = yield this.store.createRecord('entry', {
        session: session,
        groupId: this.model.group.id,
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


