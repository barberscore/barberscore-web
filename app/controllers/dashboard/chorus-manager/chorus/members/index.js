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
  filteredMembers: Ember.computed.filterBy(
    'model.members',
    'status',
    'Active'
  ),
  sortedMembersProperties: [
    'nomen',
    'partSort',
  ],
  sortedMembers: Ember.computed.sort(
    'filteredMembers',
    'sortedMembersProperties'
  ),
  actions: {
    createMember(){
      let member = this.get('store').createRecord('member', {
        entity: this.get('model'),
        person: this.get('person'),
        part: this.get('part'),
      });
      member.save()
      .then(() => {
        this.set('person', null);
        this.set('part', null);
        this.set('openModal', false);
        this.get('flashMessages').success('Success');
        this.transitionToRoute('dashboard.quartet-manager.quartet.members');
      });
    },
    clearMember() {
      this.set('person', null);
      this.set('part', null);
      this.set('openModal', false);
    },
    deleteMember(member) {
      member.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
      });
    },
  }
});
