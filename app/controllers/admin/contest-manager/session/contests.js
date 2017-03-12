import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  contestSortProperties: [
    'orgSort:asc',
    'kind:asc',
  ],
  sortedContests: Ember.computed.sort(
    'model.contests',
    'contestSortProperties'
  ),
  awardCall: Ember.computed(function() {
    let convention = this.get('model.convention.id');
    return this.get('store').query('award', {
      'entity__hosts__convention': convention,
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
  flashMessage: Ember.get(this, 'flashMessages'),
  actions: {
    sortBy(contestSortProperties) {
      this.set('contestSortProperties', [contestSortProperties]);
    },
    deleteContest(contest) {
      contest.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
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
      })
      .catch(() => {
        contest.deleteRecord();
        this.get('flashMessages').danger('Error');
      });
    },
  }
});
