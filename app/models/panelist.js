import { not } from '@ember/object/computed';
import { computed } from '@ember/object';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  status: DS.attr('panelist-status'),
  num: DS.attr('number'),
  kind: DS.attr('panelist-kind'),
  category: DS.attr('panelist-category'),
  psaReport: DS.attr('string'),
  area: DS.attr('string'),

  round: DS.belongsTo('round', {async: true}),
  owners: DS.hasMany('user', {async: true}),

  personId: DS.attr('string'),
  name: DS.attr('string'),
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  district: DS.attr('string'),
  email: DS.attr('string'),
  cellPhone: DS.attr('string'),
  airports: DS.attr('string'),

  scores: DS.hasMany('score', {async: true}),
  permissions: DS.attr(),

  psa: memberAction({ path: 'psa', type: 'get', ajaxOptions: { arraybuffer: true } }),

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
