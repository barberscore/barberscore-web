import { computed } from '@ember/object';
import { not } from '@ember/object/computed';
import Model from '@ember-data/model';
import DS from 'ember-data';
import { apiAction } from '@mainmatter/ember-api-actions';

export default Model.extend({
  status: DS.attr('round-status'),
  kind: DS.attr('round-kind'),
  num: DS.attr('number'),
  spots: DS.attr('number'),
  date: DS.attr('isodate'),
  footnotes: DS.attr('string'),
  ossReport: DS.attr('string'),
  saReport: DS.attr('string'),
  legacyOss: DS.attr('string'),
  isReviewed: DS.attr('boolean'),

  conventionId: DS.attr('string'),
  nomen: DS.attr('string'),
  timezone: DS.attr('string'),
  imageId: DS.attr('string'),

  sessionId: DS.attr('string'),
  sessionKind: DS.attr('session-kind'),
  baseFilename: DS.attr('string'),
  scoresheetFilename: DS.attr('string'),

  revisionNumber: DS.attr('number'),
  revisionDate: DS.attr('string'),
  revisionNomen: DS.attr('string'),

  owners: DS.hasMany('user', {async: true, inverse: null}),

  appearances: DS.hasMany('appearance', {async: true, inverse: 'round'}),
  panelists: DS.hasMany('panelist', {async: true, inverse: 'round'}),
  outcomes: DS.hasMany('outcome', {async: true, inverse: 'round'}),
  permissions: DS.attr(),

  reset: async function(data) {
    return await apiAction(this, {path: 'reset', type: 'POST'})
  },
  build: async function(data) {
    return await apiAction(this, {path: 'build', type: 'POST'})
  },
  start: async function(data) {
    return await apiAction(this, {path: 'start', type: 'POST'})
  },
  complete: async function(data) {
    return await apiAction(this, {path: 'complete', type: 'post'})
  },
  finalize: async function(data) {
    return await apiAction(this, {path: 'finalize', type: 'post'})
  },
  publish: async function(data) {
    return await apiAction(this, {path: 'publish', type: 'post'})
  },
  labels: async function(data) {
    return await apiAction(this, {path: 'labels', type: 'post', ajaxOptions: { arraybuffer: true }})
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
