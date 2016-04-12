import DS from 'ember-data';
import {memberAction} from 'ember-api-actions';

export default DS.Model.extend({
  name: DS.attr('string'),
  status: DS.attr('session-status'),
  kind: DS.attr('session-kind'),
  date: DS.attr('date-range'),
  administrator: DS.belongsTo('person', {inverse: 'sessions_ca', async: true}),
  convention: DS.belongsTo('convention', {async: true}),
  rounds: DS.hasMany('round', {async: true}),
  performers: DS.hasMany('performer', {async: true}),
  contests: DS.hasMany('contest', {async: true}),
  judges: DS.hasMany('judge', {inverse: 'session', async: true}),
  assistants: DS.hasMany('assistant', {async: true}),
  open: memberAction({path: 'open', type: 'post'}),
  close: memberAction({path: 'close', type: 'post'}),
  validate: memberAction({path: 'validate', type: 'post'}),
  start: memberAction({path: 'start', type: 'post'}),
  finish: memberAction({path: 'finish', type: 'post'}),
  draft: memberAction({path: 'draft', type: 'post'}),
  publish: memberAction({path: 'publish', type: 'post'}),
  cursor: DS.attr('string'),
});
