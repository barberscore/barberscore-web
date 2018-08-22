import { not } from '@ember/object/computed';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  nomen: DS.attr('string'),
  firstName: DS.attr('string'),
  middleName: DS.attr('string'),
  lastName: DS.attr('string'),
  nickName: DS.attr('string'),
  status: DS.attr('person-status'),
  birthDate: DS.attr('isodate'),
  spouse: DS.attr('string', {defaultValue:''}),
  location: DS.attr('string', {defaultValue:''}),
  part: DS.attr('person-part'),
  website: DS.attr('string', {defaultValue:''}),
  facebook: DS.attr('string', {defaultValue:''}),
  twitter: DS.attr('string', {defaultValue:''}),
  email: DS.attr('string', {defaultValue:''}),
  address: DS.attr('string', {defaultValue:''}),
  homePhone: DS.attr('string', {defaultValue:''}),
  workPhone: DS.attr('string', {defaultValue:''}),
  cellPhone: DS.attr('string', {defaultValue:''}),
  airports: DS.attr(),
  image: DS.attr('string'),
  description: DS.attr('string', {defaultValue:''}),
  bhsId: DS.attr('number'),
  fullName: DS.attr('string'),
  commonName: DS.attr('string'),
  sortName: DS.attr('string'),
  assignments: DS.hasMany('assignment', {async: true}),
  members: DS.hasMany('member', {async: true}),
  officers: DS.hasMany('officer', {async: true}),
  panelists: DS.hasMany('panelist', {async: true}),
  user: DS.belongsTo('user', {async: true}),
  permissions: DS.attr(),

  activate: memberAction({path: 'activate', type: 'post'}),
  deactivate: memberAction({path: 'deactivate', type: 'post'}),

  isDisabled: not(
    'permissions.write'
  ),

  statusOptions: [
    'New',
    'Active',
    'Inactive',
    'Retired',
    'Deceased',
    '(Six)',
    '(Nine)',
  ],

  kindOptions: [
    'New',
    'Member',
    'Non-Member',
    'Associate',
  ],
});
