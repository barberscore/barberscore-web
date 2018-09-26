import { alias, not } from '@ember/object/computed';
import { computed } from '@ember/object';
import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  status: DS.attr('panelist-status'),
  num: DS.attr('number'),
  kind: DS.attr('panelist-kind'),
  category: DS.attr('panelist-category'),
  round: DS.belongsTo('round', {async: true}),
  person: DS.belongsTo('person', {async: true}),
  scores: DS.hasMany('score', {async: true}),
  permissions: DS.attr(),

  isDisabled: not(
    'permissions.write'
  ),

  rowClass: computed(
    'kind', function() {
      if (this.category === 'Music') {
        return 'warning';
      } else if (this.category === 'Performance') {
        return 'success';
      } else if (this.category === 'Singing') {
        return 'info';
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
