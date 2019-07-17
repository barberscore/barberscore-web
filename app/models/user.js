import { not } from '@ember/object/computed';
import DS from 'ember-data';

export default DS.Model.extend({
  status: DS.attr('user-status'),
  username: DS.attr('string'),
  name: DS.attr('string'),
  email: DS.attr('string'),
  isActive: DS.attr('boolean'),
  isStaff: DS.attr('boolean'),
  roles: DS.attr(),
  permissions: DS.attr(),

  isDisabled: not(
    'permissions.write'
  ),
});
