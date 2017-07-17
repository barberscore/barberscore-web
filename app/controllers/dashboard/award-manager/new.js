import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  saveAward: task(function *() {
    try {
      let award = yield this.get('model').save();
      this.get('flashMessages').success("Saved!");
      this.transitionToRoute('dashboard.award-manager.award.details', award);
    } catch(e) {
      e.errors.forEach((error) => {
        this.get('flashMessages').danger(error.detail);
      })
    }
  }).drop(),
  organizationCall: Ember.computed(function() {
    return this.get('store').query('organization', {
      'officers__person__user': this.get('currentUser.user.id'),
      'officers__office__is_award_manager': true,
      'status__gte': 0,
    });
  }),
  organizationOptionsProperties: [
    'kindSort:asc',
    'name:asc',
  ],
  organizationUniqs: Ember.computed.uniq(
    'organizationCall',
  ),
  organizationOptions: Ember.computed.sort(
    'organizationUniqs',
    'organizationOptionsProperties'
  ),
  // awardCall: Ember.computed(function() {
  //   let awards = [];
  //   this.get('store').query('award', {
  //     'organization__officers__person__user': this.get('currentUser.user.id'),
  //     'organization__officers__office__is_award_manager': true
  //   }).then((data) => {
  //     awards.addObjects(data);
  //   });
  //   this.get('store').query('award', {
  //     'parent__organization__officers__person__user': this.get('currentUser.user.id'),
  //     'parent__organization__officers__office__is_award_manager': true
  //   }).then((data) => {
  //     awards.addObjects(data);
  //   });
  //   return awards;
  // }),
  // awardOptionsProperties: [
  //   'organizationKindSort:asc',
  //   'kindSort:asc',
  //   'name:asc',
  // ],
  // awardUniques: Ember.computed.uniq(
  //   'awardCall',
  // ),
  // awardOptions: Ember.computed.sort(
  //   'awardUniques',
  //   'awardOptionsProperties'
  // ),
  actions: {
    cancelAward(){
      this.transitionToRoute('dashboard.award-manager');
    },
    willTransition() {
      this._super(...arguments);
      const record = this.get('model');
      record.rollbackAttributes();
    },
  },
});
