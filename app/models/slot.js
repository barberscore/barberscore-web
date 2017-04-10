import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('song-status'),
  round: DS.belongsTo('round', {async: true}),
  appearances: DS.hasMany('appearance', {async: true}),
  num: DS.attr('number'),
  onstage: DS.attr('date'),
  permissions: DS.attr(),

  statusOptions: [
    'New',
  ],

});
