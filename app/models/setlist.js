import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  status: DS.attr('setlist-status'),
  performer: DS.belongsTo('performer', {async: true}),
  chart: DS.belongsTo('chart', {async: true}),
});
