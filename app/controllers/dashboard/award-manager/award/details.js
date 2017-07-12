import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  currentUser: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  entityCall: Ember.computed(function() {
    return this.get('store').query('entity', {
      'officers__person__user': this.get('currentUser.user.id'),
      'officers__person__is_award_manager': true
    });
  }),
  entityOptionsProperties: [
    'kindSort:asc',
    'name:asc',
  ],
  entityOptions: Ember.computed.sort(
    'entityCall',
    'entityOptionsProperties'
  ),
  awardCall: Ember.computed(function() {
    return this.get('store').query('award', {
      'entity__officers__person__user': this.get('currentUser.user.id'),
      'entity__officers__person__is_award_manager': true
    });
  }),
  awardOptionsProperties: [
    'kindSort:asc',
    'name:asc',
  ],
  awardUniques: Ember.computed.uniq(
    'awardCall',
  ),
  awardOptions: Ember.computed.sort(
    'awardUniques',
    'awardOptionsProperties'
  ),
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
