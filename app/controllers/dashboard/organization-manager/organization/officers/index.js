import { filterBy, sort } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  sortedOfficersProperties: [
    'nomen',
    'partSort',
  ],
  filteredOfficers: filterBy(
    'model.officers',
    'isOld'
  ),
  activeOfficers: filterBy(
    'filteredOfficers',
    'status',
    'Active'
  ),
  inactiveOfficers: filterBy(
    'filteredOfficers',
    'status',
    'Active'
  ),
  sortedOfficers: sort(
    'activeOfficers',
    'sortedOfficersProperties'
  ),
  sortedInactiveOfficers: sort(
    'inactiveOfficers',
    'sortedOfficersProperties'
  ),
  actions: {
    // createOfficer(){
    //   let officer = this.get('store').createRecord('officer', {
    //     groupd: this.get('model')
    //   });
    //   this.set('officer', officer);
    //   this.set('openModal', true);
    // },
  }
});
