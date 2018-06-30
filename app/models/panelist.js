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
      if (this.get('category') === 'Music') {
        return 'warning';
      } else if (this.get('category') === 'Performance') {
        return 'success';
      } else if (this.get('category') === 'Singing') {
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
      return this.get('categoryOptions').indexOf(this.get('category'));
    }
  ),
  isScoring: computed(
    'category',
    function() {
      return ['Singing', 'Music', 'Performance',].includes(this.get('category'));
    }
  ),
  kindSort: computed(
    'kind',
    'kindOptions',
    function() {
      return this.get('kindOptions').indexOf(this.get('kind'));
    }
  ),
  personSort: alias('person.sortName'),
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
