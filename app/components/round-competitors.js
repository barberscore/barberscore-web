import { not, sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { task } from 'ember-concurrency';
// import { denodeify } from 'rsvp'
import config from '../config/environment';
import { computed } from '@ember/object';

export default Component.extend({
  apiHost: config.APP.API_HOST,
  flashMessages: service(),
  router: service(),
  algolia: service(),
  store: service(),
  isDisabled: not(
    'model.permissions.write',
  ),
  csa: computed(
    'apiHost',
    'model',
    function() {
      return this.get('apiHost')+this.get('model.csa');
    }
  ),
  sortedCompetitorsProperties: [
    'totPoints:desc',
    'groupName',
  ],
  sortedCompetitors: sort(
    'model.session.competitors',
    'sortedCompetitorsProperties'
  ),
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


