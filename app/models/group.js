import { computed } from '@ember/object';
import { equal, notEmpty } from '@ember/object/computed';
import Model from 'ember-data/model';
import DS from 'ember-data';
// import { validator, buildValidations } from 'ember-cp-validations';
import { memberAction } from 'ember-api-actions';

// const Validations = buildValidations({
//   email: validator('format', {
//     type: 'email',
//     allowBlank: true
//   }),
//   website: validator('format', {
//     type: 'url',
//     allowBlank: true
//   }),
// });

export default Model.extend({
  nomen: DS.attr('string'),
  name: DS.attr('string'),
  status: DS.attr('group-status'),
  kind: DS.attr('group-kind'),
  gender: DS.attr('group-gender'),
  shortName: DS.attr('string'),
  code: DS.attr('string'),
  startDate: DS.attr('isodate'),
  endDate: DS.attr('isodate'),
  location: DS.attr('string'),
  website: DS.attr('string'),
  facebook: DS.attr('string'),
  twitter: DS.attr('string'),
  email: DS.attr('string'),
  phone: DS.attr('string'),
  img: DS.attr('string'),
  description: DS.attr('string'),
  bhsId: DS.attr('number'),
  orgSort: DS.attr('number'),
  international: DS.attr('string'),
  district: DS.attr('string'),
  division: DS.attr('string'),
  chapter: DS.attr('string'),
  organization: DS.belongsTo('organization', {async: true}),
  awards: DS.hasMany('award', {async: true}),
  conventions: DS.hasMany('convention', {async: true}),
  entries: DS.hasMany('entry', {async: true}),
  competitors: DS.hasMany('competitor', {async: true}),
  members: DS.hasMany('member', {async: true}),
  officers: DS.hasMany('officer', {async: true}),
  repertories: DS.hasMany('repertory', {async: true}),
  permissions: DS.attr(),

  activate: memberAction({path: 'activate', type: 'post'}),
  deactivate: memberAction({path: 'deactivate', type: 'post'}),

  isActive: equal(
    'status',
    'Active',
  ),

  kindOptions: [
    'Quartet',
    'Chorus',
  ],

  kindSort: computed(
    'kind',
    'kindOptions',
    function() {
      return this.get('kindOptions').indexOf(this.get('kind'));
    }
  ),
  genderOptions: [
    'Male',
    'Female',
    'Mixed',
  ],

  genderSort: computed(
    'gender',
    'genderOptions',
    function() {
      return this.get('genderOptions').indexOf(this.get('gender'));
    }
  ),
  statusOptions: [
    'New',
    'Active',
    'Inactive',
  ],

  isBhs: notEmpty(
    'bhsId',
  ),

  statusSort: computed(
    'status',
    'statusOptions',
    function() {
      return this.get('statusOptions').indexOf(this.get('status'));
    }
  ),
});
