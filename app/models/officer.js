import { computed } from '@ember/object';
import { equal, not, alias } from '@ember/object/computed';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  status: DS.attr('officer-status'),
  startDate: DS.attr('isodate'),
  endDate: DS.attr('isodate'),
  office: DS.belongsTo('office', {async: true}),
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
      return this.get('statusOptions').indexOf(this.get('status'));
    }
  ),


// Other
  personName: alias('person.fullName'),
  officeShortName: alias('office.shortName'),
  officeCodeSort: alias('office.codeSort'),
  officeKind: alias('office.kind'),
  officeName: alias('office.name'),
  isChartManager: alias('office.isChartManager'),
  groupName: alias('group.name'),
  groupSort: alias('group.treeSort'),
});
