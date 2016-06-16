import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany } from 'ember-data/relationships';
import {memberAction} from 'ember-api-actions';

export default Model.extend({
  name: attr('string'),
  status: attr('performer-status'),
  picture: attr('string'),
  tenor: belongsTo('role', {async: true}),
  lead: belongsTo('role', {async: true}),
  baritone: belongsTo('role', {async: true}),
  bass: belongsTo('role', {async: true}),
  soa: attr('number'),
  men: attr('number'),
  risers: attr('number'),
  is_evaluation: attr('boolean'),
  is_private: attr('boolean'),
  director: belongsTo('role', {async: true}),
  codirector: belongsTo('role', {async: true}),
  representing: belongsTo('organization', {async: true}),
  seed: attr('number'),
  prelim: attr('number'),
  rank: attr('number'),
  mus_points: attr('number'),
  prs_points: attr('number'),
  sng_points: attr('number'),
  total_points: attr('number'),
  mus_score: attr('number'),
  prs_score: attr('number'),
  sng_score: attr('number'),
  total_score: attr('number'),
  group: belongsTo('group', {async: true}),
  session: belongsTo('session', {async: true}),
  performances: hasMany('performance', {async: true}),
  contestants: hasMany('contestant', {async: true}),
  submissions: hasMany('submission', {async: true}),
  scratch: memberAction({path: 'scratch'}),

  contestantSort: [
    'contest.is_qualifier:asc',
    'contest.award.level:desc',
    'contest.award.organization.name:asc',
    'contest.award.is_primary:desc',
    'contest.award.kind:asc',
    'contest.award.is_improved:asc',
    'contest.award.size:asc',
    'contest.award.scope:asc',
  ],
  sortedContestants: Ember.computed.sort(
    'contestants',
    'contestantSort'
  ),

  performanceSort: [
    'soa',
    'name',
  ],
  sortedPerformances: Ember.computed.sort(
    'performances',
    'performanceSort'
  ),
});
