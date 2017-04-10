import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('submission-status'),
  title: DS.attr('string'),
  bhs_id: DS.attr('number'),
  is_medley: DS.attr('boolean'),
  is_parody: DS.attr('boolean'),
  composers: DS.attr('string', {defaultValue:''}),
  arrangers: DS.attr('string', {defaultValue:''}),
  holders: DS.attr('string', {defaultValue:''}),
  entry: DS.belongsTo('entry', {async: true}),
  repertory: DS.belongsTo('repertory', {async: true}),
  permissions: DS.attr(),

  statusOptions: [
    'New',
    'Pre-Submitted',
    'Post-Submitted',
    'Validated',
  ],

});
