import { not } from '@ember/object/computed';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  status: DS.attr('person-status'),
  prefix: DS.attr('string'),
  firstName: DS.attr('string'),
  middleName: DS.attr('string'),
  lastName: DS.attr('string'),
  nickName: DS.attr('string'),
  suffix: DS.attr('string'),
  birthDate: DS.attr('isodate'),
  spouse: DS.attr('string', {defaultValue:''}),
  location: DS.attr('string', {defaultValue:''}),
  part: DS.attr('person-part'),
  mon: DS.attr('number'),
  gender: DS.attr('person-gender'),
  representing: DS.attr('person-representing'),
  isDeceased: DS.attr('boolean'),
  isHonorary: DS.attr('boolean'),
  isSuspended: DS.attr('boolean'),
  isExpelled: DS.attr('boolean'),
  website: DS.attr('string', {defaultValue:''}),
  email: DS.attr('string', {defaultValue:''}),
  address: DS.attr('string', {defaultValue:''}),
  homePhone: DS.attr('string', {defaultValue:''}),
  workPhone: DS.attr('string', {defaultValue:''}),
  cellPhone: DS.attr('string', {defaultValue:''}),
  airports: DS.attr(),
  description: DS.attr('string', {defaultValue:''}),
  notes: DS.attr('string', {defaultValue:''}),
  bhsId: DS.attr('number'),
  mcPk: DS.attr('string'),

  nomen: DS.attr('string'),
  fullName: DS.attr('string'),
  commonName: DS.attr('string'),
  sortName: DS.attr('string'),
  initials: DS.attr('string'),
  imageId: DS.attr('string'),

  // currentThrough: DS.attr('isodate'),
  // currentStatus: DS.attr('boolean'),
  // currentDistrict: DS.attr('boolean'),

  owners: DS.hasMany('user', {async: true}),
  permissions: DS.attr(),

  activate: memberAction({path: 'activate', type: 'post'}),
  deactivate: memberAction({path: 'deactivate', type: 'post'}),

  isDisabled: not(
    'permissions.write'
  ),

});
