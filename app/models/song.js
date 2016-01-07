import DS from 'ember-data';

export default DS.Model.extend({
  performance: DS.belongsTo('performance', {async: true}),
  name: DS.attr('string'),
});
