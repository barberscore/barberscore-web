import Ember from 'ember';
import Model from 'ember-data/model';
import DS from 'ember-data';
import {memberAction} from 'ember-api-actions';

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('officer-status'),
  startDate: DS.attr('isodate'),
  endDate: DS.attr('isodate'),
  office: DS.belongsTo('office', {async: true}),
  person: DS.belongsTo('person', {async: true}),
  entity: DS.belongsTo('entity', {async: true}),
  permissions: DS.attr(),

  activate: memberAction({path: 'activate', type: 'post'}),
  deactivate: memberAction({path: 'deactivate', type: 'post'}),

  statusOptions: [
    'New',
    'Active',
    'Inactive',
  ],

  statusSort: Ember.computed(
    'status',
    'statusOptions',
    function() {
      return this.get('statusOptions').indexOf(this.get('status'));
    }
  ),
  personName: Ember.computed.alias('person.name'),
  officeShortName: Ember.computed.alias('office.shortName'),
  officeSCJCSort: Ember.computed.alias('office.scjcSort'),
  officeKind: Ember.computed.alias('office.kind'),
  officeName: Ember.computed.alias('office.name'),
  entityName: Ember.computed.alias('entity.name'),
  isOld: Ember.computed.not('isNew'),
  isML: Ember.computed.alias('office.isChartManager'),
  isDRCJ: Ember.computed.alias('office.isConventionManager'),
  isConventionManager: Ember.computed.alias('office.isConventionManager'),
});
