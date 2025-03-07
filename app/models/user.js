import { not } from '@ember/object/computed';
import Model, { attr, hasMany } from '@ember-data/model';

export default Model.extend({
  status: attr('user-status'),
  name: attr('string'),
  email: attr('string'),
  isActive: attr('boolean'),
  isStaff: attr('boolean'),
  roles: hasMany('role', {async: true, inverse: 'users'}),
  conventions: hasMany('convention', {async: true, inverse: 'owners'}),
  permissions: attr(),

  isDisabled: not(
    'permissions.write'
  ),
});
