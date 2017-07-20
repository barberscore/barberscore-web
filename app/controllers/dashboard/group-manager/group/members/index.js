import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  sortedMembersProperties: [
    'statusSort',
    'partSort',
    'nomen',
  ],
  sortedMembers: Ember.computed.sort(
    'model.members',
    'sortedMembersProperties'
  ),
  actions: {
    createMember(){
      this.transitionToRoute('dashboard.group-manager.group.members.new');
    },
  }
});
