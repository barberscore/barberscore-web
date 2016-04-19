import Ember from 'ember';

export default Ember.Controller.extend({
  isStatic: true,
  actions: {
    newConvention() {
      this.set('isStatic', true);
    },
    editConvention() {
      this.set('isStatic', false);
    },
    cancelConvention() {
      this.model.rollbackAttributes();
      this.set('isStatic', true);
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
        this.set('isStatic', true);
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
    deleteParticipant(participant) {
      participant.destroyRecord();
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
    3,4,5,6,7,8,9,10,11,12,13
  ]
});
