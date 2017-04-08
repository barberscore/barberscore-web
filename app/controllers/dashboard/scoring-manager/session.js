import Ember from 'ember';

export default Ember.Controller.extend({
  roundSortProperties: [
    'num:asc',
  ],
  sortedRounds: Ember.computed.sort(
    'model.rounds',
    'roundSortProperties'
  ),
  // store: Ember.inject.service(),
  // isCollapsed: true,
  // isRaw: false,
  // entrySortProperties: [
  //   'entry.entryscore.total_points:desc',
  //   'group.nomen:asc',
  // ],
  // sortedEntries: Ember.computed.sort(
  //   'model.entries',
  //   'entrySortProperties'
  // ),
  // actions: {
  //   collapseHeader() {
  //     this.toggleProperty('isCollapsed');
  //   },
  //   sortBy(entrySortProperties) {
  //     this.set('entrySortProperties', [entrySortProperties]);
  //   },
  //   sortPerformancesBy(performanceSortProperties) {
  //     this.set('perfSort', [performanceSortProperties]);
  //   },
  //   newSession() {
  //     let newSession = this.store.createRecord(
  //       'session'
  //     );
  //     this.set('model', newSession);
  //     this.set('isEditing', true);
  //   },
  //   editSession() {
  //     this.set('isEditing', true);
  //   },
  //   cancelSession() {
  //     this.model.rollbackAttributes();
  //     this.set('isEditing', false);
  //   },
  //   deleteSession() {
  //     this.model.destroyRecord()
  //     .then(() => {
  //       this.get('flashMessages').warning('Deleted');
  //       this.transitionToRoute('dashboard');
  //     })
  //     .catch(() => {
  //       this.get('flashMessages').danger('Error');
  //     });
  //   },
  //   saveSession() {
  //     this.model.save()
  //     .then(() => {
  //       this.set('isEditing', false);
  //       this.get('flashMessages').success('Saved');
  //     })
  //     .catch(() => {
  //       this.get('flashMessages').danger('Error');
  //     });
  //   },
  //   scratchEntry(entry) {
  //     entry.scratch();
  //   },
  //   disqualifyEntry(entry) {
  //     entry.disqualify();
  //   },
  //   deleteEntry(entry) {
  //     entry.destroyRecord();
  //   },
  //   scratchAssignment(assignment) {
  //     assignment.destroyRecord();
  //   },
  //   deleteAssignment(assignment) {
  //     assignment.destroyRecord();
  //   },
  //   deleteContest(contest) {
  //     contest.destroyRecord();
  //   },
  //   openSession() {
  //     this.model.open()
  //     .then(response => {
  //       this.store.pushPayload('session', response);
  //     })
  //     .catch(() => {
  //       this.get('flashMessages').danger("Error" );
  //     });
  //   },
  //   closeSession() {
  //     this.model.close()
  //     .then(response => {
  //       this.store.pushPayload('session', response);
  //     })
  //     .catch(() => {
  //       this.get('flashMessages').danger("Error" );
  //     });
  //   },
  //   validateSession() {
  //     this.model.validate()
  //     .then(response => {
  //       this.store.pushPayload('session', response);
  //     })
  //     .catch(() => {
  //       this.get('flashMessages').danger("Error" );
  //     });
  //   },
  //   startSession() {
  //     this.model.start()
  //     .then(response => {
  //       this.store.pushPayload('session', response);
  //     })
  //     .catch(() => {
  //       this.get('flashMessages').danger("Error" );
  //     });
  //   },
  //   drawCurrent() {
  //     this.model.get('current').then(current => {
  //       current.draw()
  //       .then(response => {
  //         this.store.pushPayload('round', response);
  //       })
  //       .catch(() => {
  //         this.get('flashMessages').danger("Error" );
  //       });
  //     });
  //   },
  //   validateCurrent() {
  //     this.model.get('current').then(current => {
  //       current.validate()
  //       .then(response => {
  //         this.store.pushPayload('round', response);
  //       })
  //       .catch(() => {
  //         this.get('flashMessages').danger("Error" );
  //       });
  //     });
  //   },
  //   startCurrent() {
  //     this.model.get('current').then(current => {
  //       // this.model.cursor = current.get('opener');
  //       current.start()
  //       .then(response => {
  //         this.store.pushPayload('round', response);
  //       })
  //       .catch(() => {
  //         this.get('flashMessages').danger("Error" );
  //       });
  //     });
  //   },
  //   finishCurrent() {
  //     this.model.get('current').then(current => {
  //       current.finish()
  //       .then(response => {
  //         this.store.pushPayload('round', response);
  //       })
  //       .catch(() => {
  //         this.get('flashMessages').danger("Error" );
  //       });
  //     });
  //   },
  //   publishCurrent() {
  //     this.model.get('current').then(current => {
  //       current.publish()
  //       .then(response => {
  //         this.store.pushPayload('round', response);
  //       })
  //       .catch(() => {
  //         this.get('flashMessages').danger("Error" );
  //       });
  //     });
  //   },
  //   finishSession() {
  //     this.model.finish()
  //     .then(response => {
  //       this.store.pushPayload('session', response);
  //     })
  //     .catch(() => {
  //       this.get('flashMessages').danger("Error" );
  //     });
  //   },
  //   draftSession() {
  //     this.model.draft()
  //     .then(response => {
  //       this.store.pushPayload('session', response);
  //     })
  //     .catch(() => {
  //       this.get('flashMessages').danger("Error" );
  //     });
  //   },
  //   publishSession() {
  //     this.model.publish()
  //     .then(response => {
  //       this.store.pushPayload('session', response);
  //     })
  //     .catch(() => {
  //       this.get('flashMessages').danger("Error" );
  //     });
  //   },
  //   letsGo() {
  //     this.toggleProperty('isRaw');
  //   },
  //   editOrder() {
  //     this.set('isEditing', true);
  //   },
  //   saveOrder() {
  //     let children = this.get('currentPerformances');
  //     children.forEach(function(item) {
  //       item.save();
  //     });
  //     this.set('isEditing', false);
  //   },
  //   cancelOrder() {
  //     let children = this.get('currentPerformances');
  //     children.forEach(function(item) {
  //       item.rollbackAttributes();
  //     });
  //     this.set('isEditing', false);
  //   },
  //   reorderItems(itemModels) {
  //     itemModels.forEach(function(item, index) {
  //       item.set('num', index+1);
  //     });
  //   }
  // },
});
