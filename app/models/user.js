import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  username: DS.attr('string'),
  is_active: DS.attr('boolean'),
  is_staff: DS.attr('boolean'),
  person: DS.belongsTo('person', {async: true}),
  permissions: attr(),
});
