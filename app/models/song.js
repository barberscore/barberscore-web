import { not } from '@ember/object/computed';
import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  // Fields
  nomen: DS.attr('string'),
  status: DS.attr('song-status'),
  num: DS.attr('number'),
  rank: DS.attr('number'),
  musPoints: DS.attr('number'),
  perPoints: DS.attr('number'),
  sngPoints: DS.attr('number'),
  totPoints: DS.attr('number'),
  musScore: DS.attr('number'),
  perScore: DS.attr('number'),
  sngScore: DS.attr('number'),
  totScore: DS.attr('number'),
  appearance: DS.belongsTo('appearance', {async: true}),
  chart: DS.belongsTo('chart', {async: true}),
  scores: DS.hasMany('score', {async: true}),
  permissions: DS.attr(),

  isDisabled: not(
    'permissions.write'
  ),

  statusOptions: [
    'New',
    'Validated',
    'Finished',
    'Confirmed',
    'Final',
    'Announced',
  ],
});
