import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany } from 'ember-data/relationships';
import {memberAction} from 'ember-api-actions';

export default Model.extend({
  nomen: attr('string'),
  status: attr('contest-status'),
  cycle: attr('number'),
  is_qualifier: attr('boolean'),
  kind: attr('contest-kind'),
  contestants: hasMany('contestant', {async: true}),
  primary_contest: belongsTo('session', {async: true, inverse: 'primary'}),
  award: belongsTo('award', {async: true}),
  session: belongsTo('session', {async: true}),
  contestscore: belongsTo('contestscore', {async: true}),
  permissions: attr(),

  build: memberAction({path: 'build'}),

  statusOptions: [
    'New',
    'Opened',
    'Closed',
    'Validated',
    'Finished',
    'Published',
  ],

  kindOptions: [
    'New',
    'Championship',
    'Qualifier',
  ],

  orgSort: Ember.computed(
    'award.entity.kindSort',
    function() {
      return this.get('award.entity.kindSort');
    }
  ),

});
