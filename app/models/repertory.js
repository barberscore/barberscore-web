import { not } from '@ember/object/computed';
import Model, { attr, belongsTo } from '@ember-data/model';
import { apiAction } from '@mainmatter/ember-api-actions';

export default Model.extend({
  status: attr('repertory-status'),

  chart_id: attr('string'),
  title: attr('string'),
  arrangers: attr('string'),

  entry: belongsTo('entry', {async: true, inverse: 'repertories'}),
  permissions: attr(),

  activate: async function() {
    return await apiAction(this, {path: 'activate', method: 'POST'});
  },
  deactivate: async function() {
    return await apiAction(this, {path: 'deactivate', method: 'POST'});
  },

  isDisabled: not(
    'permissions.write'
  ),

  statusOptions: [
    'New',
    'Active',
    'Inactive',
  ],

});

