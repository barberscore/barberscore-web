import { not, sort } from '@ember/object/computed';
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
  sortedEntriesProperties: [
    'nomen',
  ],
  sortedEntries: sort(
    'model.entries',
    'sortedEntriesProperties'
  ),
  groupCall: computed(
    'model',
    function() {
      let kinds = {
        'Chorus': 32,
        'Quartet': 41,
      };
      return this.get('store').query('group', {
        'status': 10, // TODO HARDCODED
        'kind': kinds[this.get('model.kind')],
        'page_size': 100
    });
  }),
  groupSortProperties: [
    'name',
  ],
  groupOptions: sort(
    'groupCall',
    'groupSortProperties'
  ),
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
      let payload = yield entry.build({
        'by': this.get('currentUser.user.id'),
      });
      this.get('store').pushPayload('entry', payload);
      this.set('createEntryModal', false);
      this.set('createEntryModalError', false);
      this.get('flashMessages').success("Created!");
      this.get('router').transitionTo('dashboard.session-manager.session.entries.entry', this.get('model'), entry.get('id'));
    } catch(e) {
      e.errors.forEach((e) => {
        this.set('deleteEntryModalError', true);
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


