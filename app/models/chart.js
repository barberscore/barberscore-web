import { not } from '@ember/object/computed';
import { computed } from '@ember/object';
import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import { apiAction } from '@mainmatter/ember-api-actions';

export default Model.extend({
  status: attr('chart-status'),
  title: attr('string'),
  arrangers: attr('string'),
  composers: attr('string'),
  lyricists: attr('string'),
  holders: attr('string'),
  description: attr('string'),
  notes: attr('string'),

  nomen: attr('string'),
  imageId: attr('string'),

  groups: hasMany('group', {async: true, inverse: 'charts'}),
  permissions: attr(),

  // songs: hasMany('song', {async: true}),
  // repertories: hasMany('repertory', {async: true}),

  activate: async function(data) {
    return await apiAction(this, {path: 'activate', method: 'POST'})
  },
  deactivate: async function(data) {
    return await apiAction(this, {path: 'deactivate', method: 'POST'})
  },
  protect: async function(data) {
    return await apiAction(this, {path: 'protect', method: 'POST'})
  },

  isDisabled: not(
    'permissions.write'
  ),

  statusOptions: [
    'Protected',
    'Inactive',
    'New',
    'Active',
  ],
  statusSort: computed(
    'status',
    'statusOptions',
    function() {
      return this.statusOptions.indexOf(this.status);
    }
  ),
});
