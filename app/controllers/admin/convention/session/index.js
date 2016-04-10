import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  isRaw: false,
  actions: {
    saveDate(start, end) {
      this.model.set('date.lower', start);
      this.model.set('date.upper', end);
      this.model.save();
    },
    addPerformance(performance) {
      performance.add_performance();
    },
    scratchPerformer(performer) {
      performer.scratch();
    },
    disqualifyPerformer(performer) {
      performer.disqualify();
    },
    deletePerformer(performer) {
      performer.destroyRecord();
    },
    scratchJudge(judge) {
      judge.destroyRecord();
    },
    deleteJudge(judge) {
      judge.destroyRecord();
    },
    deleteContest(contest) {
      contest.destroyRecord();
    },
    openSession() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.open()
      .then(response => {
        this.store.pushPayload('session', response);
      })
      .catch(() => {
        flashMessages.danger("Error" );
      });
    },
    closeSession() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.close()
      .then(response => {
        this.store.pushPayload('session', response);
      })
      .catch(() => {
        flashMessages.danger("Error" );
      });
    },
    prepareSession() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.prepare()
      .then(response => {
        this.store.pushPayload('session', response);
      })
      .catch(() => {
        flashMessages.danger("Error" );
      });
    },
    startSession() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.start()
      .then(response => {
        this.store.pushPayload('session', response);
      })
      .catch(() => {
        flashMessages.danger("Error" );
      });
    },
    finishSession() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.finish()
      .then(response => {
        this.store.pushPayload('session', response);
      })
      .catch(() => {
        flashMessages.danger("Error" );
      });
    },
    draftSession() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.draft()
      .then(response => {
        this.store.pushPayload('session', response);
      })
      .catch(() => {
        flashMessages.danger("Error" );
      });
    },
    publishSession() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.publish()
      .then(response => {
        this.store.pushPayload('session', response);
      })
      .catch(() => {
        flashMessages.danger("Error" );
      });
    },
    drawRound(round) {
      const flashMessages = Ember.get(this, 'flashMessages');
      round.draw()
      .then(() => {
        flashMessages.success('Success');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
      round.reload();
      this.transitionToRoute('admin.convention.session.round', round);
    },
    letsGo() {
      this.toggleProperty('isRaw');
    },
  },

  performerSortProperties: ['name:asc',],
  sortedPerformers: Ember.computed.sort(
    'model.performers',
    'performerSortProperties'
  ),
  contestSortProperties: [
    'award.level:desc',
    'award.organization:asc',
    'award.is_primary:desc',
    'award.kind:asc',
    'award.is_improved:asc',
    'award.size:asc',
    'award.scope:asc',
  ],
  sortedContests: Ember.computed.sort(
    'model.contests',
    'contestSortProperties'
  ),
  judgeSortProperties: ['kind', 'category', 'slot',],
  sortedJudges: Ember.computed.sort(
    'model.judges',
    'judgeSortProperties'
  ),
  primaryContests: Ember.computed.filterBy(
    'model.contests',
    'award.is_primary'
  ),
});
