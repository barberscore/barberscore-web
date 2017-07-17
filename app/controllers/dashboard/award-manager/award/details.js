import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  currentUser: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  organizationCall: Ember.computed(function() {
    return this.get('store').query('organization', {
      'officers__person__user': this.get('currentUser.user.id'),
      'officers__person__is_award_manager': true,
      'kind__in': '11,21',
    });
  }),
  organizationOptionsProperties: [
    'kindSort:asc',
    'name:asc',
  ],
  organizationOptions: Ember.computed.sort(
    'organizationCall',
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
  // awardOptions: Ember.computed.filterBy(
  //   'model.organization.parent.awards',
  //   'isChampionship',
  // ),
  autosave: task(function* (property, value){
    this.get('model').set(property, value);
    yield timeout(1000);
    try {
      yield this.get('model').save();
      this.get('flashMessages').success("Saved");
    } catch(e) {
      this.get('flashMessages').danger("Could not save; possible duplicate or empty fields!");
    }
  }).restartable(),
});
