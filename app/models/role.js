import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  status: DS.attr('role-status'),
  part: DS.attr('role-part'),
  group: DS.belongsTo('group', {async: true}),
  person: DS.belongsTo('person', {async: true}),
});
