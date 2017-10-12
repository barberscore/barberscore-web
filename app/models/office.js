import { computed } from '@ember/object';
import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  nomen: DS.attr('string'),
  name: DS.attr('string'),
  status: DS.attr('office-status'),
  kind: DS.attr('office-kind'),
  shortName: DS.attr('string'),
  officers: DS.hasMany('officer', {async: true}),
  isConventionManager: DS.attr('boolean'),
  isSessionManager: DS.attr('boolean'),
  isScoringManager: DS.attr('boolean'),
  isOrganizationManager: DS.attr('boolean'),
  isGroupManager: DS.attr('boolean'),
  isPersonManager: DS.attr('boolean'),
  isAwardManager: DS.attr('boolean'),
  isJudgeManager: DS.attr('boolean'),
  isChartManager: DS.attr('boolean'),
  permissions: DS.attr(),

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
