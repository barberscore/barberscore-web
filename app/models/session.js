import { not, sort } from '@ember/object/computed';
import { computed } from '@ember/object';
import Model from '@ember-data/model';
import DS from 'ember-data';
import { apiAction } from '@mainmatter/ember-api-actions';

const ASSIGNMENT_SORT_KEYS = ['kindSort', 'categorySort', 'lastName', 'firstName'];

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('session-status'),
  kind: DS.attr('session-kind'),
  numRounds: DS.attr('number'),
  isInvitational: DS.attr('boolean'),
  description: DS.attr('string'),
  notes: DS.attr('string'),
  footnotes: DS.attr('string'),
  legacyReport: DS.attr('string'),
  drcjReport: DS.attr('string'),

  convention_id: DS.attr('string'),
  name: DS.attr('string'),
  district: DS.attr('session-district'),
  season: DS.attr('string'),
  panel: DS.attr('string'),
  year: DS.attr('string'),
  openDate: DS.attr('date'),
  closeDate: DS.attr('date'),
  startDate: DS.attr('date'),
  endDate: DS.attr('date'),
  venueName: DS.attr('string'),
  location: DS.attr('string'),
  timezone: DS.attr('string'),
  divisions: DS.attr(),

  imageId: DS.attr('string'),

  roundsPublished: DS.attr('boolean'),

  owners: DS.hasMany('user', {async: true, inverse: null}),
  contests: DS.hasMany('contest', {async: true, inverse: null}),
  entries: DS.hasMany('entry', {async: true, inverse: 'session'}),
  assignments: DS.hasMany('assignment', {async: true, inverse: 'session'}),
  permissions: DS.attr(),

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
