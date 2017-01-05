import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany } from 'ember-data/relationships';
import {memberAction} from 'ember-api-actions';
const {computed} = Ember;

export default Model.extend({
  nomen: attr('string'),
  status: attr('round-status'),
  kind: attr('round-kind'),
  start_date: attr('isodate'),
  finish_date: attr('isodate'),
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
  permissions: attr(),

  kindSort: computed(
    'kind',
    function(){
      if (this.get('kind') === 'Quarter-Finals') {
        return 1;
      } else if (this.get('kind') === 'Semi-Finals') {
        return 2;
      } else if (this.get('kind') === 'Finals') {
        return 3;
      } else {
        return 0;
      }
    }
  ),
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
