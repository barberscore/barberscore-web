import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  officerSortProperties: [
    'isNew',
    'kindSort:asc',
    'person.name:asc',
  ],
  sortedOfficers: Ember.computed.sort(
    'model.officers',
    'officerSortProperties'
  ),
  flashMessage: Ember.get(this, 'flashMessages'),
  adminCall: Ember.computed(function() {
    return this.get('store').query('person', {
      'officers__office__kind': 30, //TODO Hardcoded
      // 'judges__status': 1,
      // 'judges__kind': 40,
      'page_size': 1000,
    });
  }),
  adminUniques: Ember.computed.uniq(
    'adminCall'
  ),
  adminSortProperties: [
    'last_name:asc',
    'first_name:asc',
  ],
  adminOptions: Ember.computed.sort(
    'adminUniques',
    'adminSortProperties'
  ),
  searchTask: task(function* (term){
    yield timeout(600);
    return this.get('store').query('person', {
      'nomen__icontains': term,
      'page_size': 1000,
    })
      .then((data) => data);
  }),
  kindOptions: [
    'DRCJ',
    'CA',
    'ACA',
    'Music',
    'Performance',
    'Singing',
  ],
  actions: {
    createOfficer(){
      let officer = this.get('store').createRecord('officer', {
        convention: this.get('model'),
        person: this.get('person'),
        kind: this.get('kind'),
      });
      officer.save()
      .then(() => {
        this.set('person', null);
        this.set('kind', null);
        this.get('flashMessages').success('Success');
      })
      .catch(() => {
        officer.deleteRecord();
        this.get('flashMessages').danger('Error');
      });
    },
    deleteOfficer(officer){
      officer.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
  }
});
