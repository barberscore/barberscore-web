import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  status: DS.attr('participant-status'),
  convention: DS.belongsTo('convention', {async: true}),
  organization: DS.belongsTo('organization', {async: true}),
});
