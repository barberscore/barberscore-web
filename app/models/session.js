import { not, sort } from '@ember/object/computed';
import { computed } from '@ember/object';
import Model, { attr, hasMany } from '@ember-data/model';
import { apiAction } from '@mainmatter/ember-api-actions';

const ASSIGNMENT_SORT_KEYS = ['kindSort', 'categorySort', 'lastName', 'firstName'];

export default Model.extend({
  nomen: attr('string'),
  status: attr('session-status'),
  kind: attr('session-kind'),
  numRounds: attr('number'),
  isInvitational: attr('boolean'),
  description: attr('string'),
  notes: attr('string'),
  footnotes: attr('string'),
  legacyReport: attr('string'),
  drcjReport: attr('string'),

  convention_id: attr('string'),
  name: attr('string'),
  district: attr('session-district'),
  season: attr('string'),
  panel: attr('string'),
  year: attr('string'),
  openDate: attr('date'),
  closeDate: attr('date'),
  startDate: attr('date'),
  endDate: attr('date'),
  venueName: attr('string'),
  location: attr('string'),
  timezone: attr('string'),
  divisions: attr(),

  imageId: attr('string'),

  roundsPublished: attr('boolean'),

  owners: hasMany('user', {async: true, inverse: null}),
  contests: hasMany('contest', {async: true, inverse: null}),
  entries: hasMany('entry', {async: true, inverse: 'session'}),
  assignments: hasMany('assignment', {async: true, inverse: 'session'}),
  permissions: attr(),

  reset: async function (data) {
    return await apiAction(this, {path: 'reset', method: 'post'})
  },
  build: async function (data) {
    return await apiAction(this, {path: 'build', method: 'post'})
  },
  open: async function (data) {
    return await apiAction(this, {path: 'open', method: 'post'})
  },
  close: async function (data) {
    return await apiAction(this, {path: 'close', method: 'post'})
  },
  verify: async function (data) {
    return await apiAction(this, {path: 'verify', method: 'post'})
  },
  package: async function (data) {
    return await apiAction(this, {path: 'package', method: 'post'})
  },
  finish: async function (data) {
    return await apiAction(this, {path: 'finish', method: 'post'})
  },

  legacy: async function (data) {
    return await apiAction(this, { path: 'legacy', method: 'get', ajaxOptions: { arraybuffer: true } })
  },
  drcj: async function (data) {
    return await apiAction(this, { path: 'drcj', method: 'get', ajaxOptions: { arraybuffer: true } })
  },


  isDisabled: not(
    'permissions.write'
  ),

  notArchived: not('isArchived'),


  statusOptions: [
    'New',
    'Built',
    'Opened',
    'Closed',
    'Verified',
    'Packaged',
    'Finished',
  ],
  kindOptions: [
    'Quartet',
    'Chorus',
    'Mixed',
    'Senior',
    'Youth',
    'Unknown',
    'VLQ',
  ],

  numOptions: [
    1,
    2,
    3,
  ],

  statusSort: computed(
    'status',
    'statusOptions',
    function() {
      return this.statusOptions.indexOf(this.status);
    }
  ),

  kindSort: computed(
    'kind',
    'kindOptions',
    function() {
      return this.kindOptions.indexOf(this.kind);
    }
  ),

  currentAppearancesSort: [
    'num',
  ],
  currentAppearances: sort(
    'current.appearances',
    'currentAppearancesSort'
  ),
});
