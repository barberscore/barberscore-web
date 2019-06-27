import Controller from '@ember/controller';
import { empty } from '@ember/object/computed';

export default Controller.extend({
  membersDisabled: empty(
    'model.members',
  ),
  assignmentsDisabled: empty(
    'model.assignments',
  ),
});
