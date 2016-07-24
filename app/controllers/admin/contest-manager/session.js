import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  isHeaderCollapsed: true,
  isRaw: false,
  performerSortProperties: [
    'performer.performerscore.total_points:desc',
    'group.nomen:asc',
  ],
  sortedPerformers: Ember.computed.sort(
    'model.performers',
    'performerSortProperties'
  ),
  actions: {
    collapseHeader() {
      this.toggleProperty('isHeaderCollapsed');
    },
    sortBy(performerSortProperties) {
      this.set('performerSortProperties', [performerSortProperties]);
    },
    sortPerformancesBy(performanceSortProperties) {
      this.set('perfSort', [performanceSortProperties]);
    },
    newSession() {
      let newSession = this.store.createRecord(
        'session'
      );
      this.set('model', newSession);
      this.set('isEditing', true);
    },
    editSession() {
      this.set('isEditing', true);
    },
    cancelSession() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deleteSession() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.destroyRecord()
      .then(() => {
        flashMessages.warning('Deleted');
        this.transitionToRoute('admin');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
    saveSession() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.save()
      .then(() => {
        this.set('isEditing', false);
        flashMessages.success('Saved');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
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
    scratchAssignment(assignment) {
      assignment.destroyRecord();
    },
    deleteAssignment(assignment) {
      assignment.destroyRecord();
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
    validateSession() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.validate()
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
    drawCurrent() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.get('current').then(current => {
        current.draw()
        .then(response => {
          this.store.pushPayload('round', response);
        })
        .catch(() => {
          flashMessages.danger("Error" );
        });
      });
    },
    validateCurrent() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.get('current').then(current => {
        current.validate()
        .then(response => {
          this.store.pushPayload('round', response);
        })
        .catch(() => {
          flashMessages.danger("Error" );
        });
      });
    },
    startCurrent() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.get('current').then(current => {
        // this.model.cursor = current.get('opener');
        current.start()
        .then(response => {
          this.store.pushPayload('round', response);
        })
        .catch(() => {
          flashMessages.danger("Error" );
        });
      });
    },
    finishCurrent() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.get('current').then(current => {
        current.finish()
        .then(response => {
          this.store.pushPayload('round', response);
        })
        .catch(() => {
          flashMessages.danger("Error" );
        });
      });
    },
    publishCurrent() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.get('current').then(current => {
        current.publish()
        .then(response => {
          this.store.pushPayload('round', response);
        })
        .catch(() => {
          flashMessages.danger("Error" );
        });
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
    letsGo() {
      this.toggleProperty('isRaw');
    },
    editOrder() {
      this.set('isEditing', true);
    },
    saveOrder() {
      let children = this.get('currentPerformances');
      children.forEach(function(item) {
        item.save();
      });
      this.set('isEditing', false);
    },
    cancelOrder() {
      let children = this.get('currentPerformances');
      children.forEach(function(item) {
        item.rollbackAttributes();
      });
      this.set('isEditing', false);
    },
    reorderItems(itemModels) {
      itemModels.forEach(function(item, index) {
        item.set('num', index+1);
      });
    }
  },
});
