import Ember from 'ember';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  isDisabled: Ember.computed.not(
    'model.permissions.write',
  ),
  representing: Ember.computed(
    'model.parent',
    function() {
      return this.get('model.parent');
    }
  ),
  isEvaluation: false,
  isPrivate: false,

  filteredEntries: Ember.computed.filterBy(
    'model.entries',
    'notAnnounced'
  ),
  sortedEntriesProperties: [
    'nomen:asc',
  ],
  sortedEntries: Ember.computed.sort(
    'filteredEntries',
    'sortedEntriesProperties'
  ),
  activeOfficers: Ember.computed.filterBy(
    'model.officers',
    'status',
    'Active'
  ),
  directors: Ember.computed.filterBy(
    'activeOfficers',
    'officeShortName',
    'CCD'
  ),
  director: Ember.computed(
    'directors.firstObject.person', function() {
      return this.get('directors.firstObject.person');
    }
  ),
  actions: {
    createEntry(){
      let entry = this.get('store').createRecord('entry', {
        group: this.get('model'),
        representing: this.get('representing'),
        isEvaluation: this.get('isEvaluation'),
        isPrivate: this.get('isPrivate'),
        director: this.get('director'),
        status: 'Submitted'
      });
      this.set('entry', entry);
      this.set('openModal', true);
    },
    deleteEntry(entry){
      entry.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
      });
    },
  }
});
