import DS from 'ember-data';

export default DS.Model.extend({
  timestamp: DS.attr('date'),
  transition: DS.attr('string'),
  description: DS.attr('string'),
  by: DS.belongsTo('user', {async: true}),
  entries: DS.belongsTo('entry', {async: true}),
});
