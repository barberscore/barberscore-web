import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  status: DS.attr('award-status'),
  kind: DS.attr('award-kind'),
  rounds: DS.attr('number'),
  long_name: DS.attr('string'),
  organization: DS.belongsTo('organization', {async: true}),
  contests: DS.hasMany('contest', {inverse:'award', async: true}),
});
