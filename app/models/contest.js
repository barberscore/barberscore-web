import { alias, equal, not, or } from '@ember/object/computed';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  status: DS.attr('contest-status'),

  awardId: DS.belongsTo('award', {async: true}),
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

  session: DS.belongsTo('session', {async: true}),
  entries: DS.hasMany('entry', {async: true}),
  permissions: DS.attr(),

  include: memberAction({path: 'include', type: 'post'}),
  exclude: memberAction({path: 'exclude', type: 'post'}),

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

  entriesCount: alias('entries.length'),

});
