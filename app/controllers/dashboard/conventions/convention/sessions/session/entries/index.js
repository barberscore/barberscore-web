import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { denodeify } from 'rsvp'

export default Controller.extend({
  flashMessages: service(),
  router: service(),
  algolia: service(),
  store: service(),
  sortedEntriesProperties: [
    'status',
    'name',
  ],
  sortedEntries: sort(
    'model.entries',
    'sortedEntriesProperties'
  ),
  searchGroup: task(function* (term){
    yield timeout(600);
    let kindModel = this.get('model.kind');
    let func = denodeify(this.algolia.search.bind(this.algolia))
    let res = yield func({ indexName: 'Group', query: term}, { filters: `get_kind_display:${kindModel} OR get_kind_display:VLQ` })
    return res.hits
  }),
  createEntryModal: false,
  createEntryModalError: false,
  saveEntry: task(function* (obj){
    try {
      let users = [];
      obj.get_owner_ids.forEach((user_id) => {
        this.store.findRecord('user', user_id).then((user) => {
          users.push(user);
        });
      })
      let entry = yield this.model.get('entries').createRecord({
        groupId: obj.objectID,
        name: obj.name,
        kind: obj.get_kind_display,
        gender: obj.get_gender_display,
        area: obj.get_district_display,
        district: obj.get_district_display,
        division: obj.get_division_display,
        participants: obj.participants,
        chapters: obj.chapters,
        image: obj.image_url,
        bhsId: obj.bhs_id,
        code: obj.code,
        repertories: [],
        owners: users,
      }).save();
      let p = yield entry.build({
        'by': this.get('currentUser.user.id'),
      });
      yield this.store.pushPayload(p);
      this.set('createEntryModal', false);
      this.set('createEntryModalError', false);
      this.set('group', null);
      this.flashMessages.success("Created!");
      // this.router.transitionTo('dashboard.conventions.convention.sessions.session.entries.entry', entry.get('id'));
      this.router.transitionTo('dashboard.conventions.convention.sessions.session.entries');
    } catch(e) {
      this.set('createEntryModalError', true);
    }
  }).drop(),
  actions: {
    cancelEntry(entry){
      entry.deleteRecord();
    },
  }

});
