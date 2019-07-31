import { computed } from '@ember/object';
import { filterBy, not, equal } from '@ember/object/computed';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

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
  participants: DS.attr('string'),
  chapters: DS.attr('string'),
  isSenior: DS.attr('boolean'),
  isYouth: DS.attr('boolean'),
  description: DS.attr('string'),
  notes: DS.attr('string'),
  sourceId: DS.attr('string'),

  nomen: DS.attr('string'),
  imageId: DS.attr('string'),

  owners: DS.hasMany('user', {async: true}),

  permissions: DS.attr(),

  activate: memberAction({path: 'activate', type: 'post'}),
  deactivate: memberAction({path: 'deactivate', type: 'post'}),

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
