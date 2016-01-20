import DS from 'ember-data';

export default DS.Model.extend({
  song_name: DS.attr('string'),
  tune: DS.belongsTo('tune', {async: true}),
  arrangers: DS.hasMany('arranger', {async: true}),
  songs: DS.hasMany('song', {async: true}),
});
