import { not, sort, filterBy } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  flashMessages: service(),
  router: service(),
  algolia: service(),
  store: service(),
  isDisabled: not(
    'model.permissions.write',
  ),
  sortedAppearancesProperties: [
    'isRanked:desc',
    'isMulti:desc',
    'competitorTotScore:desc',
    'groupName',
  ],
  sortedAppearances: sort(
    'model.appearances',
    'sortedAppearancesProperties'
  ),
  rankedAppearances: filterBy(
    'model.appearances',
    'isRanked',
  ),
  sortedRanks: sort(
    'rankedAppearances',
    'sortedAppearancesProperties'
  ),
  autosave: task(function* (property, value){
    this.get('model').set(property, value);
    yield timeout(1000);
    try {
      yield this.get('model').save();
      this.get('flashMessages').success("Saved");
    } catch(e) {
      e.errors.forEach((error) => {
        this.get('flashMessages').danger(error.detail);
      })
    }
  }).restartable(),
  // searchGroup: task(function* (term){
  //   yield timeout(600);
  //   let kindModel = this.get('model.kind');
  //   let func = denodeify(this.get('algolia').search.bind(this.get('algolia')))
  //   let res = yield func({ indexName: 'Group', query: term}, { filters: `get_kind_display:${kindModel}` })
  //   return res.hits
  // }),
  // createEntryModal: false,
  // createEntryModalError: false,
  // saveEntry: task(function* (obj){
  //   try {
  //     let group = yield this.get('store').findRecord('group', obj.objectID)
  //     let entry = yield this.get('model').get('entries').createRecord({
  //       group: group,
  //       description: '',
  //       contestants: [],
  //       isEvaluation: true,
  //       isPrivate: false,
  //       competitor: null,
  //     }).save();
  //     let p = yield entry.build({
  //       'by': this.get('currentUser.user.id'),
  //     });
  //     yield this.get('store').pushPayload(p);
  //     this.set('createEntryModal', false);
  //     this.set('createEntryModalError', false);
  //     this.get('flashMessages').success("Created!");
  //     this.get('router').transitionTo('dashboard.conventions.convention.sessions.session.entries.entry', entry.get('id'));
  //   } catch(e) {
  //     e.errors.forEach((e) => {
  //       this.set('createEntryModalError', true);
  //       this.get('flashMessages').danger(e.detail);
  //     })
  //   }
  // }).drop(),
  // actions: {
  //   cancelEntry(entry){
  //     entry.deleteRecord();
  //   },
  // }
});


