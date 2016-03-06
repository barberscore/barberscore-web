import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  status: DS.attr('chart-status'),
  is_generic: DS.attr('boolean'),
  is_parody: DS.attr('boolean'),
  is_medley: DS.attr('boolean'),
  title: DS.attr('string'),
  arranger: DS.attr('string'),
  composer: DS.attr('string'),
  lyricist: DS.attr('string'),
  songs: DS.hasMany('songs', {async: true}),
  setlists: DS.hasMany('setlists', {async: true}),
});
