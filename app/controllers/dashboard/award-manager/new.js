import { uniq, sort } from '@ember/object/computed';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { task } from 'ember-concurrency';

export default Controller.extend({
  flashMessages: service(),
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
  organizationCall: computed(function() {
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
  organizationUniqs: uniq(
    'organizationCall',
  ),
  organizationOptions: sort(
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
