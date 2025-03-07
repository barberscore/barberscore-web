import Model, { attr, belongsTo } from '@ember-data/model';

export default Model.extend({
  timestamp: attr('date'),
  transition: attr('string'),
  description: attr('string'),
  by: belongsTo('user', {async: true, inverse: null}),
});
