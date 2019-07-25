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

  user: DS.belongsTo('user', {async: true}),
  permissions: DS.attr(),

  personId: DS.attr('string'),
  commonName: DS.attr('string'),
  firstName: DS.attr('string', {defaultValue: ''}),
  middleName: DS.attr('string', {defaultValue: ''}),
  lastName: DS.attr('string', {defaultValue: ''}),
  nickName: DS.attr('string', {defaultValue: ''}),
  district: DS.attr('string', {defaultValue: ''}),
  email: DS.attr('string'),
  homePhone: DS.attr('string'),
  workPhone: DS.attr('string'),
  cellPhone: DS.attr('string'),
  airports: DS.attr(),
  imageId: DS.attr('string'),
  bhsId: DS.attr('number'),

  activate: memberAction({path: 'activate', type: 'post'}),
  deactivate: memberAction({path: 'deactivate', type: 'post'}),

  isDisabled: not(
    'permissions.write'
  ),

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
