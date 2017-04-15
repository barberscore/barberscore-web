import Ember from 'ember';
import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('officer-status'),
  start_date: DS.attr('isodate'),
  finish_date: DS.attr('isodate'),
  office: DS.belongsTo('office', {async: true}),
  person: DS.belongsTo('person', {async: true}),
  entity: DS.belongsTo('entity', {async: true}),
  permissions: DS.attr(),

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
  officeName: Ember.computed.alias('office.name'),
  entityName: Ember.computed.alias('entity.name'),
});
