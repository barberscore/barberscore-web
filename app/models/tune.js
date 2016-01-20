import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  catalogs: DS.hasMany('catalog', {async: true}),
  songs: DS.hasMany('song', {async: true}),
});
