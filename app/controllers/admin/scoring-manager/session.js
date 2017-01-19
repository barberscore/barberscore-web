import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  isCollapsed: true,
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
      this.toggleProperty('isCollapsed');
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
      isCollapsed:      this.model.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
        this.transitionToRoute('admin');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
    saveSession() {
      isCollapsed:      this.model.save()
      .then(() => {
        this.set('isEditing', false);
        this.get('flashMessages').success('Saved');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
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
      isCollapsed:      this.model.open()
      .then(response => {
        this.store.pushPayload('session', response);
      })
      .catch(() => {
        this.get('flashMessages').danger("Error" );
      });
    },
    closeSession() {
      isCollapsed:      this.model.close()
      .then(response => {
        this.store.pushPayload('session', response);
      })
      .catch(() => {
        this.get('flashMessages').danger("Error" );
      });
    },
    validateSession() {
      isCollapsed:      this.model.validate()
      .then(response => {
        this.store.pushPayload('session', response);
      })
      .catch(() => {
        this.get('flashMessages').danger("Error" );
      });
    },
    startSession() {
      isCollapsed:      this.model.start()
      .then(response => {
        this.store.pushPayload('session', response);
      })
      .catch(() => {
        this.get('flashMessages').danger("Error" );
      });
    },
    drawCurrent() {
      isCollapsed:      this.model.get('current').then(current => {
        current.draw()
        .then(response => {
          this.store.pushPayload('round', response);
        })
        .catch(() => {
          this.get('flashMessages').danger("Error" );
        });
      });
    },
    validateCurrent() {
      isCollapsed:      this.model.get('current').then(current => {
        current.validate()
        .then(response => {
          this.store.pushPayload('round', response);
        })
        .catch(() => {
          this.get('flashMessages').danger("Error" );
        });
      });
    },
    startCurrent() {
      isCollapsed:      this.model.get('current').then(current => {
        // this.model.cursor = current.get('opener');
        current.start()
        .then(response => {
          this.store.pushPayload('round', response);
        })
        .catch(() => {
          this.get('flashMessages').danger("Error" );
        });
      });
    },
    finishCurrent() {
      isCollapsed:      this.model.get('current').then(current => {
        current.finish()
        .then(response => {
          this.store.pushPayload('round', response);
        })
        .catch(() => {
          this.get('flashMessages').danger("Error" );
        });
      });
    },
    publishCurrent() {
      isCollapsed:      this.model.get('current').then(current => {
        current.publish()
        .then(response => {
          this.store.pushPayload('round', response);
        })
        .catch(() => {
          this.get('flashMessages').danger("Error" );
        });
      });
    },
    finishSession() {
      isCollapsed:      this.model.finish()
      .then(response => {
        this.store.pushPayload('session', response);
      })
      .catch(() => {
        this.get('flashMessages').danger("Error" );
      });
    },
    draftSession() {
      isCollapsed:      this.model.draft()
      .then(response => {
        this.store.pushPayload('session', response);
      })
      .catch(() => {
        this.get('flashMessages').danger("Error" );
      });
    },
    publishSession() {
      isCollapsed:      this.model.publish()
      .then(response => {
        this.store.pushPayload('session', response);
      })
      .catch(() => {
        this.get('flashMessages').danger("Error" );
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
