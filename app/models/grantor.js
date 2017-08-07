import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('officer-status'),
  session: DS.belongsTo('session', {async: true}),
  organization: DS.belongsTo('organization', {async: true}),
  permissions: DS.attr(),
});
