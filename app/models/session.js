import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  status: DS.attr('session-status'),
  kind: DS.attr('session-kind'),
  size: DS.attr('number'),
  num_rounds: DS.attr('number'),
  year: DS.attr('number'),
  administrator: DS.belongsTo('person', {async: true}),
  organization: DS.belongsTo('organization', {async: true}),
  convention: DS.belongsTo('convention', {async: true}),
  rounds: DS.hasMany('round', {async: true}),
  performers: DS.hasMany('performer', {async: true}),
  contests: DS.hasMany('contest', {async: true}),
  judges: DS.hasMany('judge', {inverse: 'session', async: true}),
});
