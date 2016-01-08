import DS from 'ember-data';

export default DS.Model.extend({
  contest: DS.belongsTo('contest', {async: true}),
  performer: DS.belongsTo('performer', {async: true}),
  name: DS.attr('string'),
  place: DS.attr('number'),
  total_score: DS.attr('number'),
});
