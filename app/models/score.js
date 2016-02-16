import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  // status: DS.attr('song-status'),
  points: DS.attr('number'),
  song: DS.belongsTo('song', {async: true}),
  judge: DS.belongsTo('judge', {async: true}),
});
