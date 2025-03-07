import { not } from '@ember/object/computed';
import Model, { attr, hasMany } from '@ember-data/model';
import { apiAction } from '@mainmatter/ember-api-actions';

export default Model.extend({
  status: attr('person-status'),
  name: attr('string'),
  firstName: attr('string'),
  lastName: attr('string'),
  part: attr('person-part'),
  gender: attr('person-gender'),
  district: attr('person-district'),
  email: attr('string', {defaultValue:''}),
  address: attr('string', {defaultValue:''}),
  homePhone: attr('string', {defaultValue:''}),
  workPhone: attr('string', {defaultValue:''}),
  cellPhone: attr('string', {defaultValue:''}),
  airports: attr(),
  description: attr('string', {defaultValue:''}),
  notes: attr('string', {defaultValue:''}),
  bhsId: attr('number'),
  sourceId: attr('string'),

  nomen: attr('string'),
  imageId: attr('string'),

  conventions: hasMany('convention', {async: true}),
  owners: hasMany('user', {async: true}),
  permissions: attr(),

  activate: async function (data) {
    return await apiAction(this, {path: 'activate', method: 'post'})
  },
  deactivate: async function (data) {
    return await apiAction(this, {path: 'deactivate', method: 'post'})
  },

  isDisabled: not(
    'permissions.write'
  ),

});
