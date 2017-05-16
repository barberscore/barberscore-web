import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('participant-status'),
  entry: DS.belongsTo('entry', {async: true}),
  member: DS.belongsTo('member', {async: true}),
  permissions: DS.attr(),

  statusOptions: [
    'New',
  ],

});
