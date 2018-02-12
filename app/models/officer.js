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
  group: DS.belongsTo('group', {async: true}),
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
  groupName: alias('group.name'),
  isOld: not('isNew'),

});
