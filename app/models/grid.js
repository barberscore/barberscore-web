import { not } from '@ember/object/computed';
import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  status: DS.attr('grid-status'),
  num: DS.attr('number'),
  location: DS.attr('string'),
  photo: DS.attr('date'),
  arrive: DS.attr('date'),
  depart: DS.attr('date'),
  backstage: DS.attr('date'),
  onstage: DS.attr('date'),
  start: DS.attr('date'),
  renditions: DS.attr(),
  round: DS.belongsTo('round', {async: true}),
  appearance: DS.belongsTo('appearance', {async: true}),
  competitor: DS.belongsTo('competitor', {async: true}),
  permissions: DS.attr(),

  isDisabled: not(
    'permissions.write'
  ),

  statusOptions: [
    'New',
  ],

});
