import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  isEditing: false,
  isDisabled: Ember.computed.not('isEditing'),
  searchPerson: task(function* (term){
    yield timeout(600);
    return this.get('store').query('person', {
      'nomen__icontains': term,
      'page_size': 100,
    }).then((data) => data);
  }),
  openModal: false,
  partOptions: [
    'Tenor',
    'Lead',
    'Baritone',
    'Bass',
    'Director',
  ],
  sortedOfficersProperties: [
    'nomen',
    'partSort',
  ],
  sortedOfficers: Ember.computed.sort(
    'model.officers',
    'sortedOfficersProperties'
  ),
  officeCall: Ember.computed(function() {
    return this.get('store').query('office', {
      'kind': 32, //TODO Hardcoded
      // 'judges__status': 1,
      // 'judges__kind': 40,
      'page_size': 1000,
    });
  }),
  officeOptionsProperties: [
    'name:asc',
  ],
  officeOptions: Ember.computed.sort(
    'officeCall',
    'officeOptionsProperties'
  ),
  actions: {
    createOfficer(){
      let officer = this.get('store').createRecord('officer', {
        entity: this.get('model'),
        person: this.get('person'),
        office: this.get('office'),
      });
      officer.save()
      .then(() => {
        this.set('person', null);
        this.set('office', null);
        this.set('openModal', false);
        this.get('flashMessages').success('Success');
        this.transitionToRoute('dashboard.quartet-manager.quartet.officers');
      });
    },
    clearOfficer() {
      this.set('person', null);
      this.set('office', null);
      this.set('openModal', false);
    },
    deleteOfficer(officer) {
      officer.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
      });
    },
  }
});
