import { not } from '@ember/object/computed';
import Model from '@ember-data/model';
import DS from 'ember-data';
import { apiAction } from '@mainmatter/ember-api-actions';

export default Model.extend({
  status: DS.attr('person-status'),
  name: DS.attr('string'),
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  part: DS.attr('person-part'),
  gender: DS.attr('person-gender'),
  district: DS.attr('person-district'),
  email: DS.attr('string', {defaultValue:''}),
  address: DS.attr('string', {defaultValue:''}),
  homePhone: DS.attr('string', {defaultValue:''}),
  workPhone: DS.attr('string', {defaultValue:''}),
  cellPhone: DS.attr('string', {defaultValue:''}),
  airports: DS.attr(),
  description: DS.attr('string', {defaultValue:''}),
  notes: DS.attr('string', {defaultValue:''}),
  bhsId: DS.attr('number'),
  sourceId: DS.attr('string'),

  nomen: DS.attr('string'),
  imageId: DS.attr('string'),

  conventions: DS.hasMany('convention', {async: true}),
  owners: DS.hasMany('user', {async: true}),
  permissions: DS.attr(),

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
