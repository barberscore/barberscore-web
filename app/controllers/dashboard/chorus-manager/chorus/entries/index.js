import Ember from 'ember';

export default Ember.Controller.extend({
  openModal: false,
  flashMessage: Ember.get(this, 'flashMessages'),

  representing: Ember.computed(
    'model.parent',
    function() {
      return this.get('model.parent');
    }
  ),
  is_evaluation: false,
  is_private: false,

  filteredEntries: Ember.computed.filterBy(
    'model.entries',
    'notPublished'
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
        entity: this.get('model'),
        representing: this.get('representing'),
        is_evaluation: this.get('is_evaluation'),
        is_private: this.get('is_private'),
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
