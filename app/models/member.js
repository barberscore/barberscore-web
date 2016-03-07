import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  status: DS.attr('member-status'),
  person: DS.belongsTo('person', {async: true}),
  chapter: DS.belongsTo('chapter', {async: true}),
});
