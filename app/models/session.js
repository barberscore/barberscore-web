import DS from 'ember-data';
import {memberAction} from 'ember-api-actions';

export default DS.Model.extend({
  name: DS.attr('string'),
  status: DS.attr('session-status'),
  kind: DS.attr('session-kind'),
  date: DS.attr('date-range'),
  administrator: DS.belongsTo('person', {inverse: 'sessions_ca', async: true}),
  aca: DS.belongsTo('person', {inverse: 'sessions_aca', async: true}),
  convention: DS.belongsTo('convention', {async: true}),
  rounds: DS.hasMany('round', {async: true}),
  performers: DS.hasMany('performer', {async: true}),
  contests: DS.hasMany('contest', {async: true}),
  judges: DS.hasMany('judge', {inverse: 'session', async: true}),
  open: memberAction({path: 'open', type: 'post'}),
  close: memberAction({path: 'close', type: 'post'}),
  prepare: memberAction({path: 'prepare', type: 'post'}),
  start: memberAction({path: 'start', type: 'post'}),
  finish: memberAction({path: 'finish', type: 'post'}),
  draft: memberAction({path: 'draft', type: 'post'}),
  publish: memberAction({path: 'publish', type: 'post'}),
});
