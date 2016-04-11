import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  status: DS.attr('assistant-status'),
  kind: DS.attr('assistant-kind'),
  session: DS.belongsTo('session', {async: true}),
  person: DS.belongsTo('person', {async: true}),
});
