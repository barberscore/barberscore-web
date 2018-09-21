import { not, alias, equal } from '@ember/object/computed';
import { computed } from '@ember/object';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  status: DS.attr('competitor-status'),
  isRanked: DS.attr('boolean'),
  isMulti: DS.attr('boolean'),
  draw: DS.attr('number'),
  musPoints: DS.attr('number'),
  perPoints: DS.attr('number'),
  sngPoints: DS.attr('number'),
  totPoints: DS.attr('number'),
  musScore: DS.attr('number'),
  perScore: DS.attr('number'),
  sngScore: DS.attr('number'),
  totScore: DS.attr('number'),
  musRank: DS.attr('number'),
  perRank: DS.attr('number'),
  sngRank: DS.attr('number'),
  totRank: DS.attr('number'),
  csa: DS.attr('string'),
  session: DS.belongsTo('session', {async: true}),
  group: DS.belongsTo('group', {async: true}),
  entry: DS.belongsTo('entry', {async: true}),
  appearances: DS.hasMany('appearance', {async: true}),
  grids: DS.hasMany('grid', {async: true}),
  permissions: DS.attr(),

  start: memberAction({path: 'start', type: 'post'}),
  finish: memberAction({path: 'finish', type: 'post'}),
  disqualify: memberAction({path: 'disqualify', type: 'post'}),
  scratch: memberAction({path: 'scratch', type: 'post'}),

  isDisabled: not(
    'permissions.write'
  ),

  isSingle: not(
    'isMulti',
  ),

  isIncluded: equal(
    'status',
    'Started',
  ),

  conventionStatus: alias('session.convention.status'),
  roundDate: alias('session.convention.startDate'),
  groupName: alias('group.name'),
  statusOptions: [
    'New',
    'Started',
    'Finished',
    'Scratched',
  ],
  statusSort: computed(
    'status',
    'statusOptions',
    function() {
      return this.get('statusOptions').indexOf(this.get('status'));
    }
  ),
});

