import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  conventions: DS.hasMany('convention', {async: true}),
});
