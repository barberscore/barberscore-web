import { sort } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  sortedGroupsProperties: [
    'name',
  ],
  sortedGroups: sort(
    'model',
    'sortedGroupsProperties'
  ),
});
