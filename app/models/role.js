import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  status: DS.attr('role-status'),
  part: DS.attr('role-part'),
  person: DS.belongsTo('person', {async: true}),
  performer: DS.belongsTo('performer', {async: true}),
});
