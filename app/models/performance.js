import DS from 'ember-data';

export default DS.Model.extend({
  round: DS.belongsTo('round', {async: true}),
  performer: DS.belongsTo('performer', {async: true}),
  name: DS.attr('string'),
  draw: DS.attr('number'),
  songs: DS.hasMany('song', {async: true}),
});
