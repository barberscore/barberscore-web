import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('grid-status'),
  num: DS.attr('number'),
  onstage: DS.attr('date'),
  start: DS.attr('date'),
  round: DS.belongsTo('round', {async: true}),
  competitor: DS.hasMany('competitors', {async: true}),
  permissions: DS.attr(),

  statusOptions: [
    'New',
  ],

});
