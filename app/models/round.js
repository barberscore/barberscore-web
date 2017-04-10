import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany } from 'ember-data/relationships';
import {memberAction} from 'ember-api-actions';

export default Model.extend({
  nomen: attr('string'),
  status: attr('round-status'),
  kind: attr('round-kind'),
  start_date: attr('isodate'),
  finish_date: attr('isodate'),
  num: attr('number'),
  // mt: belongsTo('group', {async: true}),
  // current_session: belongsTo('session', {async: true, inverse: 'current'}),
  session: belongsTo('session', {async: true}),
  appearances: hasMany('appearance', {async: true}),
  slots: hasMany('slot', {async: true}),
  permissions: attr(),

  draw: memberAction({path: 'draw'}),
  resort: memberAction({path: 'resort'}),
  start: memberAction({path: 'start', type: 'post'}),
  finish: memberAction({path: 'finish', type: 'post'}),
  publish: memberAction({path: 'publish', type: 'post'}),

  statusOptions: [
    'New',
    'Drawn',
    'Validated',
    'Started',
    'Finished',
    'Published',
  ],
  kindOptions: [
    'Finals',
    'Semi-Finals',
    'Quarter-Finals',
  ],
  kindSort: Ember.computed(
    'kind',
    'kindOptions',
    function() {
      return this.get('kindOptions').indexOf(this.get('kind'));
    }
  ),
  sessionConventionStartDate: Ember.computed.alias('session.convention.start_date'),
  sessionKindSort: Ember.computed.alias('session.kindSort'),
});
