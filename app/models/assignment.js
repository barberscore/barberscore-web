import { computed } from '@ember/object';
import { not } from '@ember/object/computed';
import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { apiAction } from '@mainmatter/ember-api-actions';

export default Model.extend({
  status: attr('assignment-status'),
  kind: attr('assignment-kind'),
  category: attr('assignment-category'),

  personId: attr('string'),
  name: attr('string'),
  firstName: attr('string', {defaultValue: ''}),
  lastName: attr('string', {defaultValue: ''}),
  display_district: attr('assignment-district'),
  district: attr('assignment-district'),
  area: attr('string'),
  email: attr('string'),
  cellPhone: attr('string'),
  airports: attr(),
  bhsId: attr('number'),

  imageId: attr('string'),

  session: belongsTo('session', {async: true, inverse: 'assignments'}),
  permissions: attr(),

  activate: async function(data) {
    return await apiAction(this, {path: 'activate', method: 'post'})
  },
  deactivate: async function(data) {
    return await apiAction(this, {path: 'deactivate', method: 'post'})
  },

  isDisabled: not(
    'permissions.write'
  ),

  categorySort: computed(
    'category',
    'categoryOptions',
    function() {
      return this.categoryOptions.indexOf(this.category);
    }
  ),
  kindSort: computed(
    'kind',
    'kindOptions',
    function() {
      return this.kindOptions.indexOf(this.kind);
    }
  ),
  statusOptions: [
    'New',
    'Active',
    'Inactive',
  ],
  categoryOptions: [
    'DRCJ',
    'PC',
    'ADM',
    'Music',
    'Performance',
    'Singing',
  ],
  kindOptions: [
    'Official',
    'Practice',
    'Observer',
    'Former',
  ],
});
