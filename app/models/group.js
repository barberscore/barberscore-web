import { computed } from '@ember/object';
import { filterBy, not, equal } from '@ember/object/computed';
import Model from '@ember-data/model';
import DS from 'ember-data';
import { apiAction } from '@mainmatter/ember-api-actions';

export default Model.extend({
  name: DS.attr('string'),
  status: DS.attr('group-status'),
  kind: DS.attr('group-kind'),
  gender: DS.attr('group-gender'),
  district: DS.attr('group-district'),
  division: DS.attr('group-division'),
  bhsId: DS.attr('number'),
  code: DS.attr('string'),
  website: DS.attr('string'),
  location: DS.attr('string'),
  // participants: DS.attr('string'),
  // chapters: DS.attr('string'),
  // pos: DS.attr('number'),
  isSenior: DS.attr('boolean'),
  isYouth: DS.attr('boolean'),
  description: DS.attr('string'),
  notes: DS.attr('string'),
  sourceId: DS.attr('string'),

  nomen: DS.attr('string'),
  imageId: DS.attr('string'),

  owners: DS.hasMany('user', {async: true, inverse: null}),
  charts: DS.hasMany('chart', {async: true, inverse: 'groups'}),

  permissions: DS.attr(),

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
