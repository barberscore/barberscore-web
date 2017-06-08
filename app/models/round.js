import Ember from 'ember';
import Model from 'ember-data/model';
import DS from 'ember-data';
import {memberAction} from 'ember-api-actions';

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('round-status'),
  kind: DS.attr('round-kind'),
  start_date: DS.attr('isodate'),
  finish_date: DS.attr('isodate'),
  num: DS.attr('number'),
  // mt: DS.belongsTo('group', {async: true}),
  // current_session: DS.belongsTo('session', {async: true, inverse: 'current'}),
  session: DS.belongsTo('session', {async: true}),
  appearances: DS.hasMany('appearance', {async: true}),
  slots: DS.hasMany('slot', {async: true}),
  panelists: DS.hasMany('panelist', {async: true}),
  permissions: DS.attr(),

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
