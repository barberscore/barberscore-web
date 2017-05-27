import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr('string'),
  is_active: DS.attr('boolean'),
  is_staff: DS.attr('boolean'),
  person: DS.belongsTo('person', {async: true}),
  permissions: DS.attr(),

  disabledAssignments: Ember.computed.not(
    'person.assignments.length'
  )

});
