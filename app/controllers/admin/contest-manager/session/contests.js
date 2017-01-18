import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  searchTask: task(function* (term){
    yield timeout(600);
    return this.get('store').query('award', {'nomen__icontains': term})
      .then((data) => data);
  }),
  actions: {
    deleteContest(contest) {
      const flashMessages = Ember.get(this, 'flashMessages');
      contest.destroyRecord()
      .then(() => {
        flashMessages.warning('Deleted');
        this.transitionToRoute('admin.contest-manager.session.contests');
      })
      .catch((error) => {
        console.log(error);
      });
    },
    saveAward() {
      const flashMessages = Ember.get(this, 'flashMessages');
      var contest = this.get('store').createRecord('contest', {
        session: this.get('model'),
        award: this.get('award'),
      });
      contest.save()
      .then(() => {
        flashMessages.success('Contest Added');
        this.set('award', null);
      })
      .catch((error) => {
        contest.deleteRecord();
        console.log(error);
        flashMessages.danger("Error");
      });
    }
  }
});
