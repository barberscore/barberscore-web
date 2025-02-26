import { not } from '@ember/object/computed';
import Model from '@ember-data/model';
import DS from 'ember-data';
import { apiAction } from '@mainmatter/ember-api-actions';

export default Model.extend({
  status: DS.attr('repertory-status'),

  chart_id: DS.attr('string'),
  title: DS.attr('string'),
  arrangers: DS.attr('string'),

  entry: DS.belongsTo('entry', {async: true, inverse: 'repertories'}),
  permissions: DS.attr(),

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

