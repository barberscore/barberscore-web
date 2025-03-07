import { computed } from '@ember/object';
import { not } from '@ember/object/computed';
import Model, { attr, hasMany } from '@ember-data/model';
import { apiAction } from '@mainmatter/ember-api-actions';

export default Model.extend({
  status: attr('round-status'),
  kind: attr('round-kind'),
  num: attr('number'),
  spots: attr('number'),
  date: attr('isodate'),
  footnotes: attr('string'),
  ossReport: attr('string'),
  saReport: attr('string'),
  legacyOss: attr('string'),
  isReviewed: attr('boolean'),

  conventionId: attr('string'),
  nomen: attr('string'),
  timezone: attr('string'),
  imageId: attr('string'),

  sessionId: attr('string'),
  sessionKind: attr('session-kind'),
  baseFilename: attr('string'),
  scoresheetFilename: attr('string'),

  revisionNumber: attr('number'),
  revisionDate: attr('string'),
  revisionNomen: attr('string'),

  owners: hasMany('user', {async: true, inverse: null}),

  appearances: hasMany('appearance', {async: true, inverse: 'round'}),
  panelists: hasMany('panelist', {async: true, inverse: 'round'}),
  outcomes: hasMany('outcome', {async: true, inverse: 'round'}),
  permissions: attr(),

  reset: async function(data) {
    return await apiAction(this, {path: 'reset', method: 'POST', data: data})
  },
  build: async function(data) {
    return await apiAction(this, {path: 'build', method: 'POST', data: data})
  },
  start: async function(data) {
    return await apiAction(this, {path: 'start', method: 'POST', data: data})
  },
  complete: async function(data) {
    return await apiAction(this, {path: 'complete', method: 'POST', data: data})
  },
  finalize: async function(data) {
    return await apiAction(this, {path: 'finalize', method: 'POST', data: data})
  },
  publish: async function(data) {
    return await apiAction(this, {path: 'publish', method: 'POST', data: data})
  },
  labels: async function(data) {
    return await apiAction(this, {path: 'labels', method: 'POST', ajaxOptions: { arraybuffer: true, data: data }})
  },

  mock: async function(data) {
    return await apiAction(this, {path: 'mock', method: 'GET'})
  },
  oss: async function(data) {
    return await apiAction(this, { path: 'oss', type: 'post', ajaxOptions: { arraybuffer: true } })
  },
  sa: async function(data) {
    return await apiAction(this, { path: 'sa', type: 'get', ajaxOptions: { arraybuffer: true } })
  },
  legacyoss: async function(data) {
    return await apiAction(this, { path: 'legacyoss', type: 'get', ajaxOptions: { arraybuffer: true } })
  },
  titles: async function(data) {
    return await apiAction(this, { path: 'titles', type: 'get', ajaxOptions: { arraybuffer: true } })
  },
  announcements: async function(data) {
    return await apiAction(this, { path: 'announcements', type: 'get', ajaxOptions: { arraybuffer: true } })
  },

  isDisabled: not(
    'permissions.write'
  ),

  isFinals: computed(
    'round',
    function() {
      if (this.get('kind') == 'Finals') {
        return true;
      }
      return false;
    }
  ),

  statusOptions: [
    'New',
    'Drawn',
    'Validated',
    'Started',
    'Completed',
    'Announced',
  ],
  kindOptions: [
    'Finals',
    'Semi-Finals',
    'Quarter-Finals',
  ],
  kindSort: computed(
    'kind',
    'kindOptions',
    function() {
      return this.kindOptions.indexOf(this.kind);
    }
  ),
  statusSort: computed(
    'status',
    'statusOptions',
    function() {
      return this.statusOptions.indexOf(this.status);
    }
  ),

});
