import { computed } from '@ember/object';
import { not } from '@ember/object/computed';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  status: DS.attr('assignment-status'),
  kind: DS.attr('assignment-kind'),
  category: DS.attr('assignment-category'),

  personId: DS.attr('string'),
  name: DS.attr('string'),
  firstName: DS.attr('string', {defaultValue: ''}),
  lastName: DS.attr('string', {defaultValue: ''}),
  display_district: DS.attr('assignment-district'),
  district: DS.attr('assignment-district'),
  area: DS.attr('string'),
  email: DS.attr('string'),
  cellPhone: DS.attr('string'),
  airports: DS.attr(),
  bhsId: DS.attr('number'),

  imageId: DS.attr('string'),

  session: DS.belongsTo('session', {async: true}),
  permissions: DS.attr(),

  activate: memberAction({path: 'activate', type: 'post'}),
  deactivate: memberAction({path: 'deactivate', type: 'post'}),

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
