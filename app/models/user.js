import { not } from '@ember/object/computed';
import DS from 'ember-data';

export default DS.Model.extend({
  status: DS.attr('user-status'),
  username: DS.attr('string'),
  isActive: DS.attr('boolean'),
  isStaff: DS.attr('boolean'),
  person: DS.belongsTo('person', {async: true}),
  permissions: DS.attr(),
  isDisabled: not(
    'permissions.write'
  ),
});
