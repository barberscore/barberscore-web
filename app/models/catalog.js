import DS from 'ember-data';

export default DS.Model.extend({
  song_name: DS.attr('string'),
  tune: DS.belongsTo('tune', {async: true}),
});
