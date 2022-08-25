import Controller from '@ember/controller';
import ENV from '../../config/environment';
// import { intersect } from '@ember/object/computed';

export default Controller.extend({
  collapsedNote: true,
  groupRoles: ['Manager',],
  // groupIntersect: intersect(
  //   'model.roles',
  //   'groupRoles',
  // ),
  judgeRoles: ['SCJC', 'DRCJ', 'CA', 'ADM', 'PC',],
  // judgeIntersect: intersect(
  //   'model.roles',
  //   'judgeRoles'
  // ),
  groupsDisabled: false,
  assignmentsDisabled: false,
  // groupsDisabled: empty(
  //   'groupIntersect',
  // ),
  // assignmentsDisabled: empty(
  //   'judgeIntersect',
  // ),
  managerEnabled: ENV.APP.managerEnabled,
});
