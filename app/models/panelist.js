import { alias, not } from '@ember/object/computed';
import { computed } from '@ember/object';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  status: DS.attr('panelist-status'),
  num: DS.attr('number'),
  kind: DS.attr('panelist-kind'),
  category: DS.attr('panelist-category'),
  round: DS.belongsTo('round', {async: true}),
  person: DS.belongsTo('person', {async: true}),
  scores: DS.hasMany('score', {async: true}),
  permissions: DS.attr(),

  psa: memberAction({ path: 'psa', type: 'get', ajaxOptions: { arraybuffer: true } }),

  isDisabled: not(
    'permissions.write'
  ),

  conventionName: alias('round.session.convention.nomen'),
  sessionKind: alias('round.session.kind'),
  roundKind: alias('round.kind'),
  personName: alias('person.commonName'),

  rowClass: computed(
    'kind', function() {
      if (this.category === 'Music') {
        return 'warning score-height';
      } else if (this.category === 'Performance') {
        return 'success score-height';
      } else if (this.category === 'Singing') {
        return 'info score-height';
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
  personSort: alias('person.sortName'),
  personLastName: alias('person.lastName'),
  personFirstName: alias('person.firstName'),
  statusOptions: [
    'New',
    'Active',
    'Inactive',
  ],
  categoryOptions: [
    'DRCJ',
    'CA',
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
