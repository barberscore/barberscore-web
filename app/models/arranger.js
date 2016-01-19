import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  part: DS.attr('arranger-part'),
  person: DS.belongsTo('person', {async: true}),
  catalog: DS.belongsTo('catalog', {async: true}),
});
