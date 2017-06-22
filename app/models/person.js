import Ember from 'ember';
import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  nomen: DS.attr('string'),
  name: DS.attr('string'),
  status: DS.attr('person-status'),
  birth_date: DS.attr('isodate'),
  dues_thru: DS.attr('isodate'),
  spouse: DS.attr('string', {defaultValue:''}),
  location: DS.attr('string', {defaultValue:''}),
  part: DS.attr('person-part'),
  website: DS.attr('string', {defaultValue:''}),
  facebook: DS.attr('string', {defaultValue:''}),
  twitter: DS.attr('string', {defaultValue:''}),
  email: DS.attr('string', {defaultValue:''}),
  phone: DS.attr('string', {defaultValue:''}),
  address: DS.attr('string', {defaultValue:''}),
  home_phone: DS.attr('string', {defaultValue:''}),
  work_phone: DS.attr('string', {defaultValue:''}),
  cell_phone: DS.attr('string', {defaultValue:''}),
  airports: DS.attr(),
  description: DS.attr('string', {defaultValue:''}),
  bhs_id: DS.attr('number'),
  common_name: DS.attr('string'),
  full_name: DS.attr('string'),
  formal_name: DS.attr('string'),
  first_name: DS.attr('string'),
  last_name: DS.attr('string'),
  nick_name: DS.attr('string'),
  representing: DS.belongsTo('entity', {async: true}),
  assignments: DS.hasMany('assignment', {async: true}),
  members: DS.hasMany('member', {async: true}),
  officers: DS.hasMany('officer', {async: true}),
  panelists: DS.hasMany('panelist', {async: true}),
  user: DS.belongsTo('user', {async: true}),
  permissions: DS.attr(),

  statusOptions: [
    'New',
    'Active',
    'Inactive',
    'Retired',
    'Deceased',
    '(Six)',
    '(Nine)',
  ],

  kindOptions: [
    'New',
    'Member',
    'Non-Member',
    'Associate',
  ],
  filteredMembers: Ember.computed.filterBy(
    'members',
    'entityKind',
    'Organization'
  ),
  withExp: Ember.computed(
    'name',
    'dues_thru',
    function() {
      return this.get('name') + " " + this.get('dues_thru');
    }
  )
});
