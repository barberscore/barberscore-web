import { computed } from '@ember/object';
import { equal, alias, not } from '@ember/object/computed';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('officer-status'),
  startDate: DS.attr('isodate'),
  endDate: DS.attr('isodate'),
  office: DS.belongsTo('office', {async: true}),
  person: DS.belongsTo('person', {async: true}),
  organization: DS.belongsTo('organization', {async: true}),
  permissions: DS.attr(),

  // Transitions
  activate: memberAction({path: 'activate', type: 'post'}),
  deactivate: memberAction({path: 'deactivate', type: 'post'}),

  // Constants
  statusOptions: [
    'New',
    'Active',
    'Inactive',
  ],

  // Module Permissions
  isActive: equal(
    'status',
    'Active',
  ),

  // isConventionManager: Ember.computed.and(
  //   'office.isConventionManager',
  //   'isActive'
  // ),
  //
  // isSessionManager: Ember.computed.and(
  //   'office.isSessionManager',
  //   'isActive'
  // ),
  //
  // isScoringManager: Ember.computed.and(
  //   'office.isScoringManager',
  //   'isActive'
  // ),
  //
  // isOrganizationManager: Ember.computed.and(
  //   'office.isOrganizationManager',
  //   'isActive'
  // ),
  //
  // isGroupManager: Ember.computed.and(
  //   'office.isGroupManager',
  //   'isActive'
  // ),
  //
  // isPersonManager: Ember.computed.and(
  //   'office.isPersonManager',
  //   'isActive'
  // ),
  //
  // isAwardManager: Ember.computed.and(
  //   'office.isAwardManager',
  //   'isActive'
  // ),
  //
  // isJudgeManager: Ember.computed.and(
  //   'office.isJudgeManager',
  //   'isActive'
  // ),
  //
  // isChartManager: Ember.computed.and(
  //   'office.isChartManager',
  //   'isActive'
  // ),

  // Sorts
  statusSort: computed(
    'status',
    'statusOptions',
    function() {
      return this.get('statusOptions').indexOf(this.get('status'));
    }
  ),


// Other
  personName: alias('person.fullName'),
  officeShortName: alias('office.shortName'),
  officeSCJCSort: alias('office.scjcSort'),
  officeKind: alias('office.kind'),
  officeName: alias('office.name'),
  organizationName: alias('organization.name'),
  isOld: not('isNew'),

});
