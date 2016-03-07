import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  status: DS.attr('chapter-status'),
  code: DS.attr('string'),
  organization: DS.belongsTo('organization', {async: true}),
  groups: DS.belongsTo('group', {async: true}),
  members: DS.belongsTo('member', {async: true}),
});
