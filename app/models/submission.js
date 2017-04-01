import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo} from 'ember-data/relationships';

export default Model.extend({
  nomen: attr('string'),
  status: attr('submission-status'),
  title: attr('string'),
  bhs_id: attr('number'),
  is_medley: attr('boolean'),
  is_parody: attr('boolean'),
  composers: attr('string', {defaultValue:''}),
  arrangers: attr('string', {defaultValue:''}),
  holders: attr('string', {defaultValue:''}),
  performer: belongsTo('performer', {async: true}),
  catalog: belongsTo('catalog', {async: true}),
  permissions: attr(),

  statusOptions: [
    'New',
    'Pre-Submitted',
    'Post-Submitted',
    'Validated',
  ],

});
