import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  entrySortProperties: [
    'nomen:asc',
  ],
  sortedEntries: Ember.computed.sort(
    'model.entries',
    'entrySortProperties'
  ),
  isEditing: false,
  isDisabled: Ember.computed.not('isEditing'),
  openModal: false,
  flashMessages: Ember.inject.service(),
  kindy: Ember.computed(
    'model.kind', function() {
      return (this.get('model.kind') === 'Chorus') ? 32 : 41;
  }),
  searchEntity: task(function* (term){
    yield timeout(600);
    return this.get('store').query('entity', {
        'nomen__icontains': term,
        'kind': this.get('kindy'),
        'status': 10,
        'page_size': 1000,
      })
      .then((data) => data);
  }),
  representingCall: Ember.computed(function() {
    return this.get('store').query('entity', {
        'kind__lt': '30',
        'page_size': 100,
      });
  }),
  representingSortProperties: [
    'orgSort:asc',
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
  isEvaluation: true,
  isPrivate: false,
  actions: {
    sortBy(entrySortProperties) {
      this.set('entrySortProperties', [entrySortProperties]);
    },
    createEntry(){
      let entry = this.get('store').createRecord('entry', {
        entity: this.get('entity'),
        session: this.get('model'),
        representing: this.get('representing'),
        isEvaluation: this.get('isEvaluation'),
        isPrivate: this.get('isPrivate'),
        tenor: this.get('tenor'),
        lead: this.get('lead'),
        baritone: this.get('baritone'),
        bass: this.get('bass'),
        director: this.get('director'),
        codirector: this.get('codirector'),
      });
      entry.save()
      .then(() => {
        this.set('entity', null);
        this.set('representing', null);
        this.set('tenor', null);
        this.set('lead', null);
        this.set('baritone', null);
        this.set('bass', null);
        this.set('director', null);
        this.set('codirector', null);
        this.set('openModal', false);
        this.set('isEditing', false);
        this.get('flashMessages').success('Success');
        this.transitionToRoute('dashboard.session-manager.session.entries.entry', entry);
      });
    },
    clearEntry() {
      this.set('entity', null);
      this.set('representing', null);
      this.set('tenor', null);
      this.set('lead', null);
      this.set('baritone', null);
      this.set('bass', null);
      this.set('director', null);
      this.set('codirector', null);
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
