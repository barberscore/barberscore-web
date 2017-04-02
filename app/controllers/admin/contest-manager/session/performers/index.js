import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  performerSortProperties: [
    'nomen:asc',
  ],
  sortedPerformers: Ember.computed.sort(
    'model.performers',
    'performerSortProperties'
  ),
  isEditing: false,
  isDisabled: Ember.computed.not('isEditing'),
  openModal: false,
  flashMessage: Ember.get(this, 'flashMessages'),
  searchEntity: task(function* (term){
    yield timeout(600);
    return this.get('store').query('entity', {
        'nomen__icontains': term,
        'kind': 31,
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
    'model.memberships',
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
    createPerformer(){
      let performer = this.get('store').createRecord('performer', {
        entity: this.get('entity'),
        session: this.get('model'),
        representing: this.get('representing'),
        is_evaluation: this.get('is_evaluation'),
        is_private: this.get('is_private'),
        tenor: this.get('tenor'),
        lead: this.get('lead'),
        baritone: this.get('baritone'),
        bass: this.get('bass'),
      });
      performer.save()
      .then(() => {
        this.set('entity', null);
        this.set('representing', null);
        this.set('openModal', false);
        this.set('isEditing', false);
        this.get('flashMessages').success('Success');
        this.transitionToRoute('admin.contest-manager.session.performers.performer', performer);
      })
      .catch(() => {
        performer.deleteRecord();
        this.get('flashMessages').danger('Error');
      });
    },
    clearPerformer() {
      this.set('entity', null);
      this.set('representing', null);
      this.set('openModal', false);
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
