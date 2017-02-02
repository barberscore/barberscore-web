import Ember from 'ember';

export default Ember.Controller.extend({
  numOptions: [
    1,
    2,
    3
  ],
  kindOptions: [
    'Quartet',
    'Chorus',
    'Seniors',
    'Collegiate',
    'Youth',
  ],
  // filteredSessions: Ember.computed.filter(
  //   'model.sessions',
  //   function(session) {
  //     return Boolean(session.id);
  //   }
  // ),
  filteredSessions: Ember.computed.filterBy(
    'model.sessions',
    'isNew',
    false
  ),
  sortProperties: [
    'kind:asc',
  ],
  sortedItems: Ember.computed.sort(
    'filteredSessions',
    'sortProperties'
  ),
  actions: {
    addSession() {
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
      .catch((error) => {
        session.deleteRecord();
        console.log(error);
        this.get('flashMessages').danger('Error');
      });
    }
  }
});
