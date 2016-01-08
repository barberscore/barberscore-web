import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  contests: DS.hasMany('contest', {inverse:'award', async: true}),
});
