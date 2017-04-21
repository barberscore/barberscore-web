import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  isEditing: false,
  isDisabled: Ember.computed.not('isEditing'),
  openModal: false,
  flashMessage: Ember.get(this, 'flashMessages'),
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
    'Chorus'
  ),
  sessionSortProperties: [
    'nomen:asc',
  ],
  sessionOptions: Ember.computed.sort(
    'sessionFilter',
    'sessionSortProperties'
  ),
  representingCall: Ember.computed(function() {
    return this.get('store').query('entity', {
        'kind__lt': '30',
        'page_size': 100,
      });
    // }).then((data) => {
    //   sessions.addObjects(data);
    // });
    // return sessions;
  }),
  // representingFilter: Ember.computed.filterBy(
  //   'representingCall',
  //   'kind',
  //   'Chorus'
  // ),
  representingSortProperties: [
    'nomen:asc',
  ],
  representingOptions: Ember.computed.sort(
    'representingCall',
    'representingSortProperties'
  ),
  representing: Ember.computed(
    'model.parent',
    function() {
      return this.get('model.parent');
    }
  ),
  searchPerson: task(function* (term){
    yield timeout(600);
    return this.get('store').query('person', {
      'nomen__icontains': term,
      'page_size': 1000
      })
      .then((data) => data);
  }),
  is_evaluation: true,
  is_private: false,

  sortedEntriesProperties: [
    'nomen:asc',
  ],
  sortedEntries: Ember.computed.sort(
    'model.entries',
    'sortedEntriesProperties'
  ),
  actions: {
    createEntry(){
      let entry = this.get('store').createRecord('entry', {
        entity: this.get('model'),
        session: this.get('session'),
        representing: this.get('representing'),
        is_evaluation: this.get('is_evaluation'),
        is_private: this.get('is_private'),
        director: this.get('director'),
        codirector: this.get('codirector'),
      });
      entry.save()
      .then(() => {
        this.set('session', null);
        this.set('representing', null);
        this.set('openModal', false);
        this.get('flashMessages').success('Success');
        this.set('isEditing', false);
        this.transitionToRoute('dashboard.chorus-manager.chorus.entries.entry', entry);
      });
    },
    clearEntry() {
      this.set('session', null);
      this.set('representing', null);
      this.set('openModal', false);
    },
    deleteEntry(entry){
      entry.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
      });
    },
  }
});
