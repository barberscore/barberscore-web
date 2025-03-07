import { alias, equal, not, or } from '@ember/object/computed';
import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { apiAction } from '@mainmatter/ember-api-actions';

export default Model.extend({
  status: attr('contest-status'),

  awardId: belongsTo('award', {async: true, inverse: null}),
  name: attr('string'),
  kind: attr('award-kind'),
  gender: attr('award-gender'),
  level: attr('award-level'),
  season: attr('award-season'),
  description: attr('string'),
  district: attr('string'),
  division: attr('award-division'),
  age: attr('award-age'),
  isNovice: attr('boolean'),
  isSingle: attr('boolean'),
  size: attr('award-size'),
  sizeRange: attr(),
  scope: attr('award-scope'),
  scopeRange: attr(),
  treeSort: attr('number'),

  session: belongsTo('session', {async: true, inverse: null}),
  entries: hasMany('entry', {async: true, inverse: 'contests'}),
  permissions: attr(),

  include: async function (data) {
    return await apiAction(this, {path: 'include', method: 'post'})
  },
  exclude: async function (data) {
    return await apiAction(this, {path: 'exclude', method: 'post'})
  },

  isDisabled: not(
    'permissions.write'
  ),

  sessionStatus: alias(
    'session.status',
  ),

  isSessionNew: equal(
    'sessionStatus',
    'New',
  ),
  isSessionBuilt: equal(
    'sessionStatus',
    'Built',
  ),

  isSessionNewBuilt: or(
    'isSessionNew',
    'isSessionBuilt',
  ),

  isCheckboxDisabled: not(
    'isSessionNewBuilt',
  ),

  statusOptions: [
    'New',
    'Included',
    'Excluded',
  ],

  kindOptions: [
    'New',
    'Championship',
    'Qualifier',
  ],

  isIncluded: equal(
    'status',
    'Included',
  ),

  isAwardQualifier: equal(
    'level',
    'Qualifier',
  ),
  notQualifier: not(
    'isAwardQualifier',
  ),

  // entriesCount: alias('entries.length'),

});
