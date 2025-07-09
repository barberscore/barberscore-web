import { not } from '@ember/object/computed';
import { computed } from '@ember/object';
import Model, { attr, hasMany, belongsTo }  from '@ember-data/model';
import { apiAction } from '@mainmatter/ember-api-actions';

export default Model.extend({
  status: attr('panelist-status'),
  num: attr('number'),
  kind: attr('panelist-kind'),
  category: attr('panelist-category'),
  psaReport: attr('string'),
  area: attr('string'),

  round: belongsTo('round', {async: true, inverse: 'panelists'}),
  owners: hasMany('user', {async: true, inverse: null}),

  personId: attr('string'),
  name: attr('string'),
  firstName: attr('string'),
  lastName: attr('string'),
  district: attr('string'),
  email: attr('string'),
  cellPhone: attr('string'),
  airports: attr('string'),

  scores: hasMany('score', {async: true, inverse: 'panelist'}),
  permissions: attr(),

  psa: async function(data) {
    return await apiAction(this, { path: 'psa', method: 'GET', ajaxOptions: { arraybuffer: true } })
  },

  isDisabled: not(
    'permissions.write'
  ),


  rowClass: computed(
    'kind', function() {
      if (this.category === 'Music') {
        return 'table-warning score-height';
      } else if (this.category === 'Performance') {
        return 'table-success score-height';
      } else if (this.category === 'Singing') {
        return 'table-primary score-height';
      } else {
        return null;
      }
    }
  ),
  categorySort: computed(
    'category',
    'categoryOptions',
    function() {
      return this.categoryOptions.indexOf(this.category);
    }
  ),
  isScoring: computed(
    'category',
    function() {
      return ['Singing', 'Music', 'Performance',].includes(this.category);
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
  ],
});
