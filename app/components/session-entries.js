import { not, sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { denodeify } from 'rsvp'

export default Component.extend({
  flashMessages: service(),
  router: service(),
  algolia: service(),
  store: service(),
  sortedEntriesProperties: [
    'groupName',
  ],
  sortedEntries: sort(
    'model.entries',
    'sortedEntriesProperties'
  ),
  searchGroup: task(function* (term){
    yield timeout(600);
    let kindModel = this.get('model.kind');
    let func = denodeify(this.algolia.search.bind(this.algolia))
    let res = yield func({ indexName: 'Group', query: term}, { filters: `get_kind_display:${kindModel}` })
    return res.hits
  }),
  createEntryModal: false,
  createEntryModalError: false,
  saveEntry: task(function* (obj){
    try {
      let group = yield this.store.findRecord('group', obj.objectID)
      let entry = yield this.model.get('entries').createRecord({
        group: group,
        description: '',
        contestants: [],
        isEvaluation: true,
        isPrivate: false,
      }).save();
      let p = yield entry.build({
        'by': this.get('currentUser.user.id'),
      });
      yield this.store.pushPayload(p);
      this.set('createEntryModal', false);
      this.set('createEntryModalError', false);
      this.flashMessages.success("Created!");
      this.router.transitionTo('dashboard.conventions.convention.sessions.session.entries.entry', entry.get('id'));
    } catch(e) {
      e.errors.forEach((e) => {
        this.set('createEntryModalError', true);
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


