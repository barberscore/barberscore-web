import { alias, not } from '@ember/object/computed';
import { computed } from '@ember/object';
import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  nomen: DS.attr('string'),
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

  categorySort: computed(
    'category',
    'categoryOptions',
    function() {
      return this.get('categoryOptions').indexOf(this.get('category'));
    }
  ),
  kindSort: computed(
    'kind',
    'kindOptions',
    function() {
      return this.get('kindOptions').indexOf(this.get('kind'));
    }
  ),
  personSort: alias('person.lastName'),
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
