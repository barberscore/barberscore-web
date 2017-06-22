import Ember from 'ember';
import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  nomen: DS.attr('string'),
  name: DS.attr('string'),
  status: DS.attr('office-status'),
  kind: DS.attr('office-kind'),
  short_name: DS.attr('string'),
  officers: DS.hasMany('officer', {async: true}),
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

  scjcSort: Ember.computed(
    'short_name',
    'scjcSortOptions',
    function() {
      return this.get('scjcSortOptions').indexOf(this.get('short_name'));
    }
  ),

});
