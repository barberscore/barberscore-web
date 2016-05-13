import Ember from 'ember';

export default Ember.Controller.extend({
  isEditing: false,
  actions: {
    previousItem(sortedItems, cursor) {
      let nowCur = sortedItems.indexOf(cursor);
      let newCur = sortedItems.objectAt(nowCur-1);
      this.transitionToRoute('admin.conventions.convention', newCur);
    },
    nextItem(sortedItems, cursor) {
      let nowCur = sortedItems.indexOf(cursor);
      let newCur = sortedItems.objectAt(nowCur+1);
      this.transitionToRoute('admin.conventions.convention', newCur);
    },
    newConvention() {
      let newConvention = this.store.createRecord(
        'convention'
      );
      this.set('model', newConvention);
      this.set('isEditing', true);
    },
    editConvention() {
      this.set('isEditing', true);
    },
    cancelConvention() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    deleteConvention() {
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
    saveConvention() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.save()
      .then(() => {
        this.transitionToRoute('admin.conventions.convention', this.model);
        this.set('isEditing', false);
        flashMessages.success('Saved');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
    updateDate(start, end) {
      this.model.set('date.lower', start);
      this.model.set('date.upper', end);
    },
    deleteSession(session) {
      session.destroyRecord();
    },
    // startConvention() {
    //   this.model.start()
    //   .then(response => {
    //     this.store.pushPayload('convention', response);
    //   })
    //   .catch(response => {
    //     console.log(response);
    //   });
    // },
    // finishConvention() {
    //   this.model.finish()
    //   .then(response => {
    //     this.store.pushPayload('convention', response);
    //   })
    //   .catch(response => {
    //     console.log(response);
    //   });
    // },
  },
  sessionSortProperties: ['kind:asc',],
  sortedSessions: Ember.computed.sort(
    'model.sessions',
    'sessionSortProperties'
  ),
  riserChoices: [
    0,3,4,5,6,7,8,9,10,11,12,13
  ],
  conventionSort: [
    'date',
  ],
  store: Ember.inject.service(),
  parentConventions: Ember.computed(function(){
    return this.store.query('convention', {year: 2016});
  }),
  sortedItems: Ember.computed.sort(
    'parentConventions',
    'conventionSort'
  ),
});
