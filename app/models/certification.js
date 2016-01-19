import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  date: DS.attr('string'),
  status: DS.attr('certification-status'),
  category: DS.attr('certification-category'),
  person: DS.belongsTo('person', {async: true}),
});
