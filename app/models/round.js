import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany } from 'ember-data/relationships';
import {memberAction} from 'ember-api-actions';

export default Model.extend({
  name: attr('string'),
  status: attr('round-status'),
  kind: attr('round-kind'),
  date: attr('date-range'),
  num: attr('number'),
  mt: belongsTo('group', {async: true}),
  current_session: belongsTo('session', {async: true, inverse: 'current'}),
  session: belongsTo('session', {async: true}),
  performances: hasMany('performance', {async: true}),
  slots: hasMany('slot', {async: true}),
  draw: memberAction({path: 'draw'}),
  resort: memberAction({path: 'resort'}),
  start: memberAction({path: 'start', type: 'post'}),
  finish: memberAction({path: 'finish', type: 'post'}),
  publish: memberAction({path: 'publish', type: 'post'}),

  performanceSort: [
    'num',
    'name',
  ],
  sortedPerformances: Ember.computed.sort(
    'performances',
    'performanceSort'
  ),
  opener: Ember.computed(
    function() {
      return this.get('sortedPerformances')[0];
    }
  )
});
