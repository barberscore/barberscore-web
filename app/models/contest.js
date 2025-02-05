import { alias, equal, not, or } from '@ember/object/computed';
import Model from '@ember-data/model';
import DS from 'ember-data';
import { apiAction } from '@mainmatter/ember-api-actions';

export default Model.extend({
  status: DS.attr('contest-status'),

  awardId: DS.belongsTo('award', {async: true, inverse: null}),
  name: DS.attr('string'),
  kind: DS.attr('award-kind'),
  gender: DS.attr('award-gender'),
  level: DS.attr('award-level'),
  season: DS.attr('award-season'),
  description: DS.attr('string'),
  district: DS.attr('string'),
  division: DS.attr('award-division'),
  age: DS.attr('award-age'),
  isNovice: DS.attr('boolean'),
  isSingle: DS.attr('boolean'),
  size: DS.attr('award-size'),
  sizeRange: DS.attr(),
  scope: DS.attr('award-scope'),
  scopeRange: DS.attr(),
  treeSort: DS.attr('number'),

  session: DS.belongsTo('session', {async: true, inverse: null}),
  entries: DS.hasMany('entry', {async: true, inverse: 'contests'}),
  permissions: DS.attr(),

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
