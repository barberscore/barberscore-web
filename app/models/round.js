import Ember from 'ember';
import Model from 'ember-data/model';
import DS from 'ember-data';
import {memberAction} from 'ember-api-actions';

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('round-status'),
  kind: DS.attr('round-kind'),
  num: DS.attr('number'),
  session: DS.belongsTo('session', {async: true}),
  appearances: DS.hasMany('appearance', {async: true}),
  panelists: DS.hasMany('panelist', {async: true}),
  slots: DS.hasMany('slot', {async: true}),
  permissions: DS.attr(),
  annPdf: DS.attr('string'),

  verify: memberAction({path: 'verify', type: 'post'}),
  start: memberAction({path: 'start', type: 'post'}),
  finish: memberAction({path: 'finish', type: 'post'}),
  announce: memberAction({path: 'announce', type: 'post'}),

  conventionStatus: Ember.computed.alias('session.convention.status'),
  conventionIsActive: Ember.computed.alias('session.convention.isActive'),
  statusOptions: [
    'New',
    'Drawn',
    'Validated',
    'Started',
    'Finished',
    'Announced',
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
  sessionConventionStartDate: Ember.computed.alias('session.convention.startDate'),
  sessionKindSort: Ember.computed.alias('session.kindSort'),
});
