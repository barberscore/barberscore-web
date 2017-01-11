import Ember from 'ember';

export default Ember.Controller.extend({
  isHeaderCollapsed: false,
  actions: {
    collapseHeader() {
      this.toggleProperty('isHeaderCollapsed');
    },
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
    }
  }
});
