import { computed } from '@ember/object';
import { filterBy, not, alias } from '@ember/object/computed';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  nomen: DS.attr('string'),
  name: DS.attr('string'),
  status: DS.attr('group-status'),
  kind: DS.attr('group-kind'),
  gender: DS.attr('group-gender'),
  division: DS.attr('group-division'),
  isSenior: DS.attr('boolean'),
  isYouth: DS.attr('boolean'),
  code: DS.attr('string'),
  startDate: DS.attr('isodate'),
  endDate: DS.attr('isodate'),
  location: DS.attr('string'),
  website: DS.attr('string'),
  facebook: DS.attr('string'),
  twitter: DS.attr('string'),
  email: DS.attr('string'),
  phone: DS.attr('string'),
  image: DS.attr('string'),
  description: DS.attr('string'),
  bhsId: DS.attr('number'),
  international: DS.attr('string'),
  district: DS.attr('string'),
  chapter: DS.attr('string'),
  treeSort: DS.attr('number'),
  parent: DS.belongsTo('group', {inverse:'children', async: true}),
  children: DS.hasMany('group', {inverse:'parent', async: true}),
  awards: DS.hasMany('award', {async: true}),
  competitors: DS.hasMany('competitor', {async: true}),
  conventions: DS.hasMany('convention', {async: true}),
  entries: DS.hasMany('entry', {async: true}),
  members: DS.hasMany('member', {async: true}),
  officers: DS.hasMany('officer', {async: true}),
  repertories: DS.hasMany('repertory', {async: true}),
  permissions: DS.attr(),

  activate: memberAction({path: 'activate', type: 'post'}),
  deactivate: memberAction({path: 'deactivate', type: 'post'}),

  isDisabled: not(
    'permissions.write'
  ),

  repertoriesCount: alias('repertories.length'),

  activeMembers: filterBy(
    'members',
    'status',
    'Active'
  ),

  activesCount: alias('activeMembers.length'),

  genderOptions: [
    'Male',
    'Female',
    'Mixed',
  ],
  genderSort: computed(
    'gender',
    'genderOptions',
    function() {
      return this.genderOptions.indexOf(this.gender);
    }
  ),
  statusOptions: [
    'New',
    'Active',
    'Inactive',
  ],
  statusSort: computed(
    'status',
    'statusOptions',
    function() {
      return this.statusOptions.indexOf(this.status);
    }
  ),

  kindOptions: [
    'International',
    'District',
    'Noncompetitive',
    'Affiliate',
    'Chapter',
    'Chorus',
    'Quartet',
  ],
  kindSort: computed(
    'kind',
    'kindOptions',
    function() {
      return this.kindOptions.indexOf(this.kind);
    }
  ),
});
