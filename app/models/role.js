import { not } from '@ember/object/computed';
import Model, { attr, hasMany } from '@ember-data/model';

export default Model.extend({
  rolename: attr('string'),
  name: attr('string'),
  description: attr('string'),
  users: hasMany('user', {async: true}),
  permissions: attr(),

  isDisabled: not(
    'permissions.write'
  ),
});
