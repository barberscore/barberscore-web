import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr('string'),
  person: DS.belongsTo('person', {async: true}),
});
