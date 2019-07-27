import { not } from '@ember/object/computed';
import DS from 'ember-data';

export default DS.Model.extend({
  rolename: DS.attr('string'),
  name: DS.attr('string'),
  description: DS.attr('string'),
  users: DS.hasMany('user', {async: true}),
  permissions: DS.attr(),

  isDisabled: not(
    'permissions.write'
  ),
});
