import { computed } from '@ember/object';
import { alias, not } from '@ember/object/computed';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  status: DS.attr('assignment-status'),
  kind: DS.attr('assignment-kind'),
  category: DS.attr('assignment-category'),
  convention: DS.belongsTo('convention', {async: true}),
  person: DS.belongsTo('person', {async: true}),
  permissions: DS.attr(),

  activate: memberAction({path: 'activate', type: 'post'}),
  deactivate: memberAction({path: 'deactivate', type: 'post'}),

  isDisabled: not(
    'permissions.write'
  ),

  personLastName: alias('person.lastName'),
  conventionStart: alias('convention.startDate'),
  conventionStatus: alias('convention.status'),
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
    'Contest Administrator',
    'Music Judge',
    'Performance Judge',
    'Singing Judge',
  ],
  kindOptions: [
    'Official',
    'Practice',
    'Observer',
  ],
});
