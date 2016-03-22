import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  status: DS.attr('score-status'),
  points: DS.attr('number'),
  kind: DS.attr('score-kind'),
  category: DS.attr('score-category'),
  dixon_test: DS.attr('string'),
  asterisk_test: DS.attr('string'),
  song: DS.belongsTo('song', {async: true}),
  judge: DS.belongsTo('judge', {async: true}),
});
