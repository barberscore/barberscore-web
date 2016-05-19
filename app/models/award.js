import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  status: DS.attr('award-status'),
  kind: DS.attr('award-kind'),
  season: DS.attr('award-season'),
  size: DS.attr('award-size'),
  scope: DS.attr('award-scope'),
  championship_rounds: DS.attr('number'),
  is_primary: DS.attr('boolean'),
  is_improved: DS.attr('boolean'),
  is_novice: DS.attr('boolean'),
  idiom: DS.attr('string'),
  threshold: DS.attr('number'),
  level: DS.attr('award-level'),
  organization: DS.belongsTo('organization', {async: true}),
  contests: DS.hasMany('contest', {inverse:'award', async: true}),
});
