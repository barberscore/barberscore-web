import { not } from '@ember/object/computed';
import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr('string'),
  isActive: DS.attr('boolean'),
  isStaff: DS.attr('boolean'),
  person: DS.belongsTo('person', {async: true}),
  permissions: DS.attr(),

  disabledAssignments: not(
    'person.assignments.length'
  )

});
