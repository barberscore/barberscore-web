import Ember from 'ember';

export default Ember.Controller.extend({
  isEditing: false,
  isDisabled: Ember.computed.not('isEditing'),
  modelKind: Ember.computed(function() {
    return this.get('model.kind');
  }),
  sessionCall: Ember.computed(function() {
    return this.get('store').query('session', {
        'status': 4
      });
    // }).then((data) => {
    //   sessions.addObjects(data);
    // });
    // return sessions;
  }),
  sessionFilter: Ember.computed.filterBy(
    'sessionCall',
    'kind',
    'Quartet'
  ),
  sessionSortProperties: [
    'nomen:asc',
  ],
  sessionOptions: Ember.computed.sort(
    'sessionFilter',
    'sessionSortProperties'
  ),
  actions: {
    createPerformer(){
      let performer = this.get('store').createRecord('performer', {
        entity: this.get('model'),
        session: this.get('session'),
      });
      performer.save()
      .then(() => {
        this.set('session', null);
        this.get('flashMessages').success('Success');
      })
      .catch(() => {
        performer.deleteRecord();
        this.get('flashMessages').danger('Error');
      });
    },
    deletePerformer(performer){
      performer.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
  }
});
