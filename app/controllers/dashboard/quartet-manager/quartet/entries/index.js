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
        'convention__status': 4
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
  //   'Quartet'
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
  activeMembers: Ember.computed.filterBy(
    'model.members',
    'status',
    'Active'
  ),
  activeTenors: Ember.computed.filterBy(
    'activeMembers',
    'part',
    'Tenor'
  ),
  tenor: Ember.computed(
    'activeTenors',
    function() {
      return this.get('activeTenors.firstObject');
    }
  ),
  activeLeads: Ember.computed.filterBy(
    'activeMembers',
    'part',
    'Lead'
  ),
  lead: Ember.computed(
    'activeLeads',
    function() {
      return this.get('activeLeads.firstObject');
    }
  ),
  activeBaritones: Ember.computed.filterBy(
    'activeMembers',
    'part',
    'Baritone'
  ),
  baritone: Ember.computed(
    'activeBaritones',
    function() {
      return this.get('activeBaritones.firstObject');
    }
  ),
  activeBasses: Ember.computed.filterBy(
    'activeMembers',
    'part',
    'Bass'
  ),
  bass: Ember.computed(
    'activeBasses',
    function() {
      return this.get('activeBasses.firstObject');
    }
  ),
  is_evaluation: true,
  is_private: false,
  actions: {
    createEntry(){
      let entry = this.get('store').createRecord('entry', {
        entity: this.get('model'),
        session: this.get('session'),
        representing: this.get('representing'),
        is_evaluation: this.get('is_evaluation'),
        is_private: this.get('is_private'),
        tenor: this.get('tenor.person'),
        lead: this.get('lead.person'),
        baritone: this.get('baritone.person'),
        bass: this.get('bass.person'),
      });
      entry.save()
      .then(() => {
        this.set('session', null);
        this.set('representing', null);
        this.set('openModal', false);
        this.get('flashMessages').success('Success');
        this.set('isEditing', false);
        this.transitionToRoute('dashboard.quartet-manager.quartet.entries.entry', entry);
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
