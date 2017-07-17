import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  contestSortProperties: [
    'organizationKindSort',
    'awardQualifier',
    'awardPrimary:desc',
    'awardAgeSort',
    'awardName',
  ],
  sortedContests: Ember.computed.sort(
    'model.contests',
    'contestSortProperties'
  ),
  awardCall: Ember.computed(function() {
    return this.get('store').query('award', {
      'page_size': 1000,
    });
  }),
  awardFiltered: Ember.computed.filter(
    'awardCall',
    function(award) {
      return award.get('kind') === this.get('model.kind');
    }
  ),
  awardSortProperties: [
    'name:asc',
  ],
  awardOptions: Ember.computed.sort(
    'awardFiltered',
    'awardSortProperties'
  ),
  kindOptions: [
    'New',
    'Championship',
    'Qualifier',
  ],
  searchTask: task(function* (term){
    yield timeout(600);
    return this.get('store').query('award', {'nomen__icontains': term})
      .then((data) => data);
  }),
  flashMessages: Ember.inject.service(),
  actions: {
    sortBy(contestSortProperties) {
      this.set('contestSortProperties', [contestSortProperties]);
    },
    deleteContest(contest) {
      contest.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
      });
    },
    addContest(){
      let contest = this.get('store').createRecord('contest', {
        session: this.get('model'),
        award: this.get('award'),
        kind: this.get('kind'),
      });
      contest.save()
      .then(() => {
        this.set('award', null);
        this.set('kind', null);
        this.get('flashMessages').success('Success');
      });
    },
  }
});
