import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  searchTask: task(function* (term){
    yield timeout(600);
    return this.get('store').query('award', {'nomen__icontains': term})
      .then((data) => data);
  }),
  flashMessage: Ember.get(this, 'flashMessages'),
  actions: {
    deleteContest(contest) {
      isCollapsed:      contest.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
        this.transitionToRoute('admin.contest-manager.session.contests');
      })
      .catch((error) => {
        console.log(error);
      });
    },
    saveAward() {
      isCollapsed:      var contest = this.get('store').createRecord('contest', {
        session: this.get('model'),
        award: this.get('award'),
      });
      contest.save()
      .then(() => {
        this.get('flashMessages').success('Contest Added');
        this.set('award', null);
      })
      .catch((error) => {
        contest.deleteRecord();
        console.log(error);
        this.get('flashMessages').danger("Error");
      });
    }
  }
});
