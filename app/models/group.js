import { computed } from '@ember/object';
import { filterBy, not, equal } from '@ember/object/computed';
import Model, { attr, hasMany } from '@ember-data/model';
import { apiAction } from '@mainmatter/ember-api-actions';

export default Model.extend({
  name: attr('string'),
  status: attr('group-status'),
  kind: attr('group-kind'),
  gender: attr('group-gender'),
  district: attr('group-district'),
  division: attr('group-division'),
  bhsId: attr('number'),
  code: attr('string'),
  website: attr('string'),
  location: attr('string'),
  // participants: attr('string'),
  // chapters: attr('string'),
  // pos: attr('number'),
  isSenior: attr('boolean'),
  isYouth: attr('boolean'),
  description: attr('string'),
  notes: attr('string'),
  sourceId: attr('string'),

  nomen: attr('string'),
  imageId: attr('string'),

  owners: hasMany('user', {async: true, inverse: null}),
  charts: hasMany('chart', {async: true, inverse: 'groups'}),

  permissions: attr(),

  activate: async function(data) {
    return await apiAction(this, {path: 'activate', method: 'POST'})
  },
  deactivate: async function(data) {
    return await apiAction(this, {path: 'deactivate', method: 'POST'})
  },

  isDisabled: not(
    'permissions.write'
  ),

  // repertoriesCount: alias('repertories.length'),

  activeMembers: filterBy(
    'members',
    'status',
    'Active'
  ),

  // activesCount: alias('activeMembers.length'),

  isFemale: equal(
    'gender',
    'Female',
  ),

  isMixed: equal(
    'gender',
    'Mixed',
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
