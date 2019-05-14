import { computed } from '@ember/object';
import { equal, not, alias } from '@ember/object/computed';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  status: DS.attr('officer-status'),
  startDate: DS.attr('isodate'),
  endDate: DS.attr('isodate'),
  office: DS.attr('officer-office'),

  person: DS.belongsTo('person', {async: true}),
  group: DS.belongsTo('group', {async: true}),
  permissions: DS.attr(),

  // Transitions
  activate: memberAction({path: 'activate', type: 'post'}),
  deactivate: memberAction({path: 'deactivate', type: 'post'}),

  isDisabled: not(
    'permissions.write'
  ),

  // Constants
  officeOptions: [
    'SCJC Chair',
    'SCJC Chair Past',
    'SCJC CA',
    'SCJC MUS',
    'SCJC PER',
    'SCJC SNG',
    'SCJC Chart',
    'SCJC Admin',
    'DRCJ',
    'DRCJ Assistant',
    'JUDGE CA',
    'JUDGE MUS',
    'JUDGE PER',
    'JUDGE SNG',
    'CPRES',
    'CSEC',
    'CDIR',
    'CASS',
    'CMAN',
    'QADM',
  ],

  officeSort: computed(
    'office',
    'officeOptions',
    function() {
      return this.officeOptions.indexOf(this.office);
    }
  ),
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


  // Sorts
  statusSort: computed(
    'status',
    'statusOptions',
    function() {
      return this.statusOptions.indexOf(this.status);
    }
  ),


// Other
  personName: alias('person.fullName'),
  personLast: alias('person.lastName'),
  personFirst: alias('person.firstName'),
  officerOfficeSort: alias('officer.officeSort'),
  groupName: alias('group.name'),
  groupSort: alias('group.treeSort'),
});
