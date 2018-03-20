import { not } from '@ember/object/computed';
import { computed } from '@ember/object';
import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  name: DS.attr('string'),
  status: DS.attr('office-status'),
  kind: DS.attr('office-kind'),
  code: DS.attr('string'),
  isConventionManager: DS.attr('boolean'),
  isSessionManager: DS.attr('boolean'),
  isScoringManager: DS.attr('boolean'),
  isGroupManager: DS.attr('boolean'),
  isPersonManager: DS.attr('boolean'),
  isAwardManager: DS.attr('boolean'),
  isJudgeManager: DS.attr('boolean'),
  isChartManager: DS.attr('boolean'),
  officers: DS.hasMany('officer', {async: true}),
  permissions: DS.attr(),

  isDisabled: not(
    'permissions.write'
  ),

  statusOptions: [
    'New',
    'Active',
    'Inactive',
  ],

  kindOptions: [
    'SCJC',
    'DRCJ',
    'CA',
    'Judge',
    'Representative',
    'Staff',
    'Admin',
  ],

  scjcSortOptions: [
    'SCJC Chair',
    'SCJC Chair Past',
    'SCJC CA',
    'SCJC MUS',
    'SCJC PER',
    'SCJC SNG',
  ],

  scjcSort: computed(
    'shortName',
    'scjcSortOptions',
    function() {
      return this.get('scjcSortOptions').indexOf(this.get('shortName'));
    }
  ),

});
