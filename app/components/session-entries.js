import { not, sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  flashMessages: service(),
  router: service(),
  store: service(),
  isDisabled: not(
    'model.permissions.write',
  ),
  sortedEntriesProperties: [
    'nomen',
  ],
  sortedEntries: sort(
    'model.entries',
    'sortedEntriesProperties'
  ),
  searchGroup: task(function* (term){
    yield timeout(600);
    let kindOptions = {
      'Chorus': 32,
      'Quartet': 41,
    };
    let kindModel = this.get('model.kind');
    let kindInt = kindOptions[kindModel];
    let groups = yield this.get('store').query('group', {
        'nomen__icontains': term,
        'status__gt': 0,
        'page_size': 1000,
        'kind': kindInt,
      });
    return groups
  }),
  createEntryModal: false,
  createEntryModalError: false,
  saveEntry: task(function* (group){
    try {
      let entry = yield this.get('store').createRecord('entry', {
        group: group,
        session: this.get('model'),
        description: '',
        contestants: [],
        isEvaluation: true,
        isPrivate: false,
        competitor: null,
      }).save();
      yield entry.build({
        'by': this.get('currentUser.user.id'),
      });
      this.get('model').reload();
      this.set('createEntryModal', false);
      this.set('createEntryModalError', false);
      this.get('flashMessages').success("Created!");
      this.get('router').transitionTo('dashboard.session-manager.session.entries.entry', this.get('model'), entry.get('id'));
    } catch(e) {
      e.errors.forEach((e) => {
        this.set('createEntryModalError', true);
        this.get('flashMessages').danger(e.detail);
      })
    }
  }).drop(),
  actions: {
    cancelEntry(entry){
      entry.deleteRecord();
    },
  }
});


