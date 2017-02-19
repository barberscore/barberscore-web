import Ember from 'ember';

export default Ember.Controller.extend({
  flashMessage: Ember.get(this, 'flashMessages'),
  sessionSortProperties: [
    'isNew',
    'name:asc',
  ],
  sortedSessions: Ember.computed.sort(
    'model.sessions',
    'sessionSortProperties'
  ),
  kindOptions: [
    'Quartet',
    'Chorus',
    'Seniors',
    'Youth',
  ],
  numOptions: [
    1,
    2,
    3,
  ],
  actions: {
    addSession(){
      let session = this.get('store').createRecord('session', {
        convention: this.get('model'),
        kind: this.get('kind'),
        num_rounds: this.get('num_rounds'),
      });
      session.save()
      .then(() => {
        this.set('kind', null);
        this.set('num_rounds', null);
        this.get('flashMessages').success('Success');
      })
      .catch(() => {
        session.deleteRecord();
        this.get('flashMessages').danger('Error');
      });
    },
    deleteSession(session){
      session.deleteRecord();
    },
    undoSession(session){
      session.rollbackAttributes();
    },
    cancelSessions(){
      this.get('model').rollbackAttributes();
    },
    saveSessions(){
      let deletedSessions = this.get('model.sessions').filterBy('isDeleted');
      deletedSessions.forEach(function(item) {
        item.destroyRecord();
      });
      let newSessions = this.get('model.sessions').filterBy('isNew');
      newSessions.forEach(function(item) {
        item.save();
      });
      this.get('flashMessages').success('Success');
    },
    newSession(){
      this.get('store').createRecord('session', {
        convention: this.get('model'),
      });
    },
  }
});
