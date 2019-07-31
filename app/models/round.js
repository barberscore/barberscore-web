import { computed } from '@ember/object';
import { not } from '@ember/object/computed';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

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
  sessionKind: DS.attr('string'),

  owners: DS.hasMany('user', {async: true}),

  appearances: DS.hasMany('appearance', {async: true}),
  panelists: DS.hasMany('panelist', {async: true}),
  outcomes: DS.hasMany('outcome', {async: true}),
  permissions: DS.attr(),

  reset: memberAction({path: 'reset', type: 'post'}),
  build: memberAction({path: 'build', type: 'post'}),
  start: memberAction({path: 'start', type: 'post'}),
  complete: memberAction({path: 'complete', type: 'post'}),
  verify: memberAction({path: 'verify', type: 'post'}),
  publish: memberAction({path: 'publish', type: 'post'}),

  mock: memberAction({path: 'mock', type: 'get'}),
  oss: memberAction({ path: 'oss', type: 'get', ajaxOptions: { arraybuffer: true } }),
  sa: memberAction({ path: 'sa', type: 'get', ajaxOptions: { arraybuffer: true } }),
  legacyoss: memberAction({ path: 'legacyoss', type: 'get', ajaxOptions: { arraybuffer: true } }),
  titles: memberAction({ path: 'titles', type: 'get', ajaxOptions: { arraybuffer: true } }),
  announcements: memberAction({ path: 'announcements', type: 'get', ajaxOptions: { arraybuffer: true } }),

  isDisabled: not(
    'permissions.write'
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
