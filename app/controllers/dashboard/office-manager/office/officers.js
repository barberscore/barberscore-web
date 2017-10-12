import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { sort, uniq } from '@ember/object/computed';
import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  officerSortProperties: [
    'isNew',
    'kindSort:asc',
    'person.name:asc',
  ],
  sortedOfficers: sort(
    'model.officers',
    'officerSortProperties'
  ),
  flashMessages: service(),
  adminCall: computed(function() {
    return this.get('store').query('person', {
      'officers__office__kind': 30, //TODO Hardcoded
      // 'judges__status': 1,
      // 'judges__kind': 40,
      'page_size': 1000,
    });
  }),
  adminUniques: uniq(
    'adminCall'
  ),
  adminSortProperties: [
    'lastName:asc',
    'firstName:asc',
  ],
  adminOptions: sort(
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
      });
    },
    deleteOfficer(officer){
      officer.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
      });
    },
  }
});
